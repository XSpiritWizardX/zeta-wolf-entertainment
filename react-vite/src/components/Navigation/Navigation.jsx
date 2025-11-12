// src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
// import { FiShoppingCart } from "react-icons/fi";
import ProfileButton from "./ProfileButton";
// import CartBadge from "../CartPage/CartBadge";
// import CartDrawer from "../CartPage/CartDrawer";
import "./Navigation.css";
// import { useState } from "react";

function Navigation() {
  // const [showCart, setShowCart] = useState(false);

  // const openCart = () => setShowCart(true);
  // const closeCart = () => setShowCart(false);

  return (
    <div className={`navigation-container`}>
      {/* Logo */}
      <NavLink to="/" className="nav-bar-logo">
        <img
          className="nav-logo"
          src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1762743629/500934938_122238075986229799_8659925724644000126_n-removebg-preview_gwlxzv.png"
          alt="Logo"
        />
      </NavLink>

      {/* Links */}
      <nav className={`page-links-container-top`}>
        <div className="page-links-cont">
          <div className="link-word-group">
            <NavLink to="/" className="nav-bar-text">Home</NavLink>
            <NavLink to="/company" className="nav-bar-text">Company</NavLink>
            <NavLink to="/solutions" className="nav-bar-text">Solutions</NavLink>
            {/* <NavLink to="/blog" className="nav-bar-text">Blog</NavLink> */}
            <NavLink to="/contact" className="nav-bar-text">Contact</NavLink>
            {/* <NavLink to="/cart" className="nav-bar-text">Cart</NavLink> */}
          </div>
        </div>
      </nav>

      <div className="icons-group">
        <a href="tel:+5172706827" className="nav-bar-text-phone-link">
          (517) 270-6827
        </a>

        {/* Cart Icon + Badge */}
        <span className="cart-icon-wrapper">
          {/* <FiShoppingCart
            className="nav-bar-text-shop-link"
            onClick={openCart}
            role="button"
            aria-label="Open cart"
            tabIndex={0}
          /> */}
          {/* <CartBadge onClick={openCart} /> */}
        </span>

        {/* Profile stays the same */}
        <ProfileButton className="nav-bar-text-shop-link" />

        {/* Drawer */}
        {/* <CartDrawer open={showCart} onClose={closeCart} /> */}
      </div>
    </div>
  );
}

export default Navigation;
