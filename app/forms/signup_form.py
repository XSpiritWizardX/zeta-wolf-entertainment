from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Length

class SignUpForm(FlaskForm):
    firstname = StringField('First Name', validators=[DataRequired(), Length(max=40)])
    lastname = StringField('Last Name', validators=[DataRequired(), Length(max=40)])
    email = StringField('Email', validators=[DataRequired()])
    phone = StringField('Phone Number', validators=[DataRequired(), Length(max=17)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6, max=50)])
