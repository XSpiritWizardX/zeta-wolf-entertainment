import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        Copyright © {year} Zeta Wolf Entertainment - All Rights Reserved.
      </div>

      <div className="footer-right">
        <div className="footer-socials">
          <a href="https://www.facebook.com/profile.php?id=61556893997678#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/timmyt2turntup/#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>
        <br/>

        <span className="footer-powered">
          Powered by{" "}
          <a
            href="https://dgi-studios.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-brand"
          >
            Dream Grid Interactive Studios
          </a>
        </span>
      </div>
    </footer>
  );
}
