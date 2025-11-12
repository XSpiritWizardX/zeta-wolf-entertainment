import "./LandingPage.css";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* ===== HERO SECTION ===== */}
      <section className="land-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="land-main-title">ZETA WOLF ENTERTAINMENT</h1>
          <h2 className="land-main-subtitle">UNLEASH THE VISION, RUN WITH THE PACK</h2>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="land-about">
        <h2>WHO WE ARE</h2>
        <p>
          Zeta Wolf Entertainment is more than a name — it’s a movement.
          A collective of creators, visionaries, and innovators forging immersive
          experiences across film, sound, and digital realms.
        </p>
        <p>
          Our pack thrives on authenticity, precision, and primal creativity.
          Every project we touch howls with a distinct identity — cinematic visuals,
          powerful music, and storytelling that bites deep.
        </p>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="land-mission">
        <div className="mission-card">
          <h2>OUR MISSION</h2>
          <p>
            To awaken the creative wilderness inside every artist and brand we collaborate with.
            We merge innovation and instinct to craft unforgettable stories that echo across industries.
          </p>
        </div>
      </section>

      {/* ===== SOCIALS SECTION ===== */}
      <section className="land-socials">
        <h2>FOLLOW THE PACK</h2>
        <p>Stay connected for updates, releases, and exclusive behind-the-scenes content.</p>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </section>

      {/* ===== CONTACT CALL ===== */}
      <section className="land-contact">
        <h2>READY TO CREATE SOMETHING LEGENDARY?</h2>
        <a href="/contact" className="contact-btn">Contact Us</a>
      </section>
    </div>
  );
}
