import "./CompanyPage.css";
import { FaCameraRetro, FaHeadphonesAlt, FaVideo, FaPalette, FaGlobeAmericas } from "react-icons/fa";

export default function CompanyPage() {
  return (
    <div className="company-page">

      {/* ===== HERO ===== */}
      <section className="company-hero">
        <div className="company-overlay" />
        <div className="company-hero-content">
          <h1>ZETA WOLF ENTERTAINMENT</h1>
          <p>Forging Legends. Creating Worlds. Empowering Visionaries.</p>
        </div>
      </section>

      {/* ===== ORIGIN / ABOUT ===== */}
      <section className="company-about">
        <h2>OUR ORIGIN</h2>
        <p>
          Born from the fire of passion and the frost of precision, Zeta Wolf Entertainment stands at the intersection of technology and artistry.
          What began as a small team of dreamers evolved into a full-spectrum creative production house — built on loyalty, instinct, and innovation.
        </p>
        <p>
          We tell stories that transcend format — blending film, sound, design, and digital experiences into seamless worlds that captivate and inspire.
        </p>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="company-services">
        <h2>WHAT WE DO</h2>
        <div className="service-grid">
          <div className="service-card">
            <FaVideo />
            <h3>Film & Video Production</h3>
            <p>Cinematic storytelling that transforms visions into visceral experiences.</p>
          </div>

          <div className="service-card">
            <FaHeadphonesAlt />
            <h3>Music & Sound Design</h3>
            <p>Immersive soundscapes and original compositions crafted with precision and emotion.</p>
          </div>

          <div className="service-card">
            <FaPalette />
            <h3>Brand Identity</h3>
            <p>From logos to launch campaigns — building worlds your audience can believe in.</p>
          </div>

          <div className="service-card">
            <FaCameraRetro />
            <h3>Photography & Visual Art</h3>
            <p>Capturing light, texture, and emotion through every lens and frame.</p>
          </div>

          <div className="service-card">
            <FaGlobeAmericas />
            <h3>Digital Strategy</h3>
            <p>Data-driven innovation — we merge creativity and analytics for real impact.</p>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="company-values">
        <div className="values-container">
          <h2>OUR VALUES</h2>
          <ul>
            <li><strong>Authenticity:</strong> We create from the heart, not from the algorithm.</li>
            <li><strong>Excellence:</strong> Every detail matters — perfection is our instinct.</li>
            <li><strong>Innovation:</strong> The future belongs to those who dare to evolve.</li>
            <li><strong>Unity:</strong> The pack is only as strong as its bond.</li>
          </ul>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="company-team">
        <h2>MEET THE PACK</h2>
        <div className="team-grid">

          <div className="team-card">
            <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1762913522/455073978_815106273982226_5332383104831404756_n_xacdtq.jpg" alt="Alex Dreamgrid" />
            <h3>Timothy Turner</h3>
            <p>Founder & Creative Visionary</p>
          </div>
          <div className="team-card">
            <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1756747720/IMG_20250824_162749713_PORTRAIT_atwbj4.jpg" alt="Dustin Bovee" />
            <h3>Dustin Bovee</h3>
            <p>Lead Software Engineer</p>
          </div>

          {/* <div className="team-card">
            <img src="https://res.cloudinary.com/dwxpnnlfe/image/upload/v1763301890/team3_wolf.jpg" alt="Luna Voss" />
            <h3>Luna Voss</h3>
            <p>Sound Designer</p>
          </div> */}
        </div>
      </section>

    </div>
  );
}
