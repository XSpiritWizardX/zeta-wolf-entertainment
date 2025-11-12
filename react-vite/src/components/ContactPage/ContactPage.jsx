import "./ContactPage.css";
import ContactForm from "../ContactForm/ContactForm"; // adjust path as needed
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <div className="contact-page">

      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="contact-overlay" />
        <div className="contact-hero-content">
          <h1>CONTACT ZETA WOLF ENTERTAINMENT</h1>
          <p>Unleash your ideas. Collaborate with the pack.</p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>Let’s Create Something Legendary</h2>
          <p>Send us your vision — we’ll handle the rest.</p>
          <ContactForm />
        </div>
      </section>

      {/* ===== INFO & SOCIALS ===== */}
      <section className="contact-info">
        <div className="info-box">
          <h3>Reach Us</h3>
          <p>Email: <a href="mailto:info@zetawolfentertainment.com">info@zetawolfentertainment.com</a></p>
          <p>Phone: <a href="tel:+15172706827">(517) 270-6827</a></p>
          <p>Location: Michigan, USA</p>
        </div>

        <div className="social-box">
          <h3>Follow The Pack</h3>
          <div className="contact-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </section>

    </div>
  );
}
