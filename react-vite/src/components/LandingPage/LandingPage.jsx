import "./LandingPage.css";
import { FaFacebook } from "react-icons/fa";
import ContactForm from "../ContactForm/ContactForm";


export default function LandingPage() {









  return (
    <div className="landing-page">
        <div className="land-top-header">
        <h1 className="land-main-title">ZETA WOLF ENTERTAINMENT</h1>
        <h1 className="land-main-subtitle">UNLEASH THE VISION, RUN WITH THE PACK</h1>
        </div>
        <h2 className="land-middle-follow-text">Follow us on social for updates.</h2>
        <span></span>
        <a className="land-face-anchor" href="https://www.facebook.com/profile.php?id=61556893997678#" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="facebook-icon" />
        </a>

        <h2 className="land-middle-contactus">Contact Us</h2>
        <span></span>
        <ContactForm/>
    </div>
  );
}
