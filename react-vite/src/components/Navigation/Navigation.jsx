// src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className={`navigation-container`}>
      {/* Logo */}
      <NavLink to="/" className="nav-bar-logo">
        <img
          className="nav-logo"
          src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1762743629/500934938_122238075986229799_8659925724644000126_n-removebg-preview_gwlxzv.png"
          alt="Logo"
        />
        <span className="nav-brand-name">Zeta Wolf Entertainment</span>
      </NavLink>
  

      {/* Links */}
      <nav className={`page-links-container-top`}>
        <div className="page-links-cont">
          <div className="link-word-group">
            <NavLink to="/" className="nav-bar-text">Home</NavLink>
            <NavLink to="/about" className="nav-bar-text">About Us</NavLink>
            <NavLink to="/services" className="nav-bar-text">Services</NavLink>
            <NavLink to="/contact" className="nav-bar-text">Contact</NavLink>
          </div>
        </div>
      </nav>

      <div className="icons-group">
        {/* <a href="tel:+5172706827" className="nav-bar-text-phone-link">
          (517) 270-6827
        </a> */}

        <span className="cart-icon-wrapper"></span>

        <ProfileButton className="nav-bar-text-shop-link" />
      </div>
    </div>
  );
}

export default Navigation;
