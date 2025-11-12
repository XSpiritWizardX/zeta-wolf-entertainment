from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, User
from app.forms import LoginForm, SignUpForm

auth_routes = Blueprint('auth', __name__)


# ---------------------------------------------------------------------------
# AUTHENTICATE CURRENT USER
# ---------------------------------------------------------------------------
@auth_routes.route('/')
def authenticate():
    """Return current user if authenticated."""
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict()), 200
    return jsonify({'errors': {'message': 'Unauthorized'}}), 401


# ---------------------------------------------------------------------------
# LOGIN
# ---------------------------------------------------------------------------
@auth_routes.route('/login', methods=['POST'])
def login():
    """Authenticate and log a user in."""
    form = LoginForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        email = form.data['email'].lower()
        password = form.data['password']

        user = User.query.filter(User.email == email).first()
        if not user or not user.check_password(password):
            return jsonify({'errors': {'password': 'Invalid credentials'}}), 401

        login_user(user)
        return jsonify(user.to_dict()), 200

    return jsonify({'errors': form.errors}), 400


# ---------------------------------------------------------------------------
# LOGOUT
# ---------------------------------------------------------------------------
@auth_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    """Logs out the current user."""
    logout_user()
    return jsonify({'message': 'User logged out'}), 200


# ---------------------------------------------------------------------------
# SIGNUP
# ---------------------------------------------------------------------------
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Register a new user with default account_type=Customer."""
    form = SignUpForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user = User(
            account_type="Customer",  # ✅ hard-coded
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            email=form.data['email'].lower(),
            phone=form.data['phone'],
            password=form.data['password']
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(user.to_dict()), 201

    return jsonify({'errors': form.errors}), 400


# ---------------------------------------------------------------------------
# UNAUTHORIZED
# ---------------------------------------------------------------------------
@auth_routes.route('/unauthorized')
def unauthorized():
    """Standard 401 handler."""
    return jsonify({'errors': {'message': 'Unauthorized'}}), 401
