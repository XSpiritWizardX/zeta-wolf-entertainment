import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thanks for reaching out!");
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
