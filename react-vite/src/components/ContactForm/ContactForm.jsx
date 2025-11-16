import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
 const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  message: "",
  subscribe: false,
});


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (res.ok) {
    alert("Thanks for reaching out! A confirmation email has been sent.");
    setForm({ name: "", email: "", message: "", subscribe: false });
  } else {
    alert("Something went wrong. Try again later.");
  }
};


  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Drop us a line!</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </label>
      <label>
        Phone
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </label>

      <label>
        Email*
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          rows="4"
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          name="subscribe"
          checked={form.subscribe}
          onChange={handleChange}
        />
        Sign up for our email list for updates, promotions, and more.
      </label>

      <button type="submit">Send</button>

      <p className="recaptcha-note">
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply.
      </p>
    </form>
  );
}
