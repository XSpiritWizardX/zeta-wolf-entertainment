# app/api/contact_routes.py
from flask import Blueprint, request, jsonify
from app.utils.mail import send_email
import os

contact_routes = Blueprint("contact", __name__)

ADMIN_EMAIL = os.environ.get("SENDGRID_ADMIN_EMAIL")


@contact_routes.route("", methods=["POST"])
def contact_form():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    message = data.get("message")
    subscribe = data.get("subscribe")

    # USER EMAIL
    user_subject = "Thanks for contacting Zeta Wolf Entertainment!"

    user_html = f"""
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0b0c; padding:40px 0; font-family:Arial, Helvetica, sans-serif;">
  <tr>
    <td align="center">

      <table role="presentation" width="650" cellspacing="0" cellpadding="0" border="0" style="background:#111; border-radius:14px; color:#fff; overflow:hidden;">

        <tr>
          <td align="center" style="padding:40px 20px 20px 20px;">
            <img src="https://res.cloudinary.com/dooet0x6x/image/upload/v1763248132/500934938_122238075986229799_8659925724644000126_n-removebg-preview_jjnauy.png"
                 width="110" alt="Zeta Wolf Logo"
                 style="display:block; margin:auto;" />
          </td>
        </tr>

        <tr>
          <td style="padding:30px 25px; color:#e8e8e8; line-height:1.6; font-size:16px;">

            <h2 style="text-align:center; color:#fff; font-weight:700; margin-bottom:20px;">
              Hey {name}, thanks for reaching out!
            </h2>

            <p>
              We're excited to connect with you. Your message has been received and the pack is already on the move.
              Someone from Zeta Wolf Entertainment will reach out shortly.
            </p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:25px;">
              <tr>
                <td style="padding:18px; background:#181818; border-left:4px solid #7b54ff; font-size:15px; color:#e8e8e8;">
                  <strong>Your message:</strong><br /><br />
                  {message}
                </td>
              </tr>
            </table>

            <p style="margin-top:20px;">
              <strong>Phone:</strong> {phone if phone else "Not provided"}
            </p>

            <p style="margin-top:25px;">
              We appreciate you taking the time to contact us. Whether you're looking for digital media,
              web development, branding, creative consulting, or full-scale production — we have you covered.
            </p>

            <p style="margin-top:25px;">
              In the meantime, feel free to explore more of our work or reach out with additional ideas.
            </p>

            <p style="margin-top:35px; font-weight:bold; color:#7b54ff; text-align:center;">
              Welcome to the Pack — your vision is in good hands.
            </p>

          </td>
        </tr>

        <tr>
          <td align="center">
            <img src="https://res.cloudinary.com/dooet0x6x/image/upload/v1763248126/571996271_1125615559597961_7709206930383545266_n_wcr6ez.jpg"
                 width="650"
                 alt="Zeta Wolf Services"
                 style="display:block; width:100%; height:auto; border:0;" />
          </td>
        </tr>

        <tr>
          <td style="padding:20px 25px; font-size:12px; color:#888; line-height:1.5; text-align:center;">
            <p style="margin-bottom:10px;">© 2025 Zeta Wolf Entertainment. All rights reserved.</p>
            <p style="margin-bottom:10px;">You are receiving this email because you contacted us through our website.</p>
            <p style="margin-bottom:10px;">This email was sent from:<br /><span style="color:#aaa;">zeta.wolf.entertainment@gmail.com</span></p>
            <p>If you believe this message was sent to you by mistake, you may ignore or delete it.</p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
"""

    send_email(email, user_subject, user_html)

    # ADMIN EMAIL
    admin_subject = "🔥 New Contact Form Submission"

    admin_html = f"""
        <h3>New Contact Message:</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone if phone else "Not provided"}</p>
        <p><strong>Message:</strong><br>{message}</p>
        <p><strong>Subscribed:</strong> {subscribe}</p>
    """

    send_email(ADMIN_EMAIL, admin_subject, admin_html)

    return jsonify({"message": "Emails sent successfully"}), 200
