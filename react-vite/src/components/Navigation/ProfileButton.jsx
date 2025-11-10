import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import "./ProfileButton.css";

// ⏰ Clock component
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="current-time">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session?.user);

  const [showMenu, setShowMenu] = useState(false); // open/close state
  const [isVisible, setIsVisible] = useState(false); // keeps dropdown in DOM for animation
  const [openSections, setOpenSections] = useState({});
  const ulRef = useRef();

  // toggle dropdown
  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!showMenu) {
      setIsVisible(true);
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  // Remove dropdown after animation
  useEffect(() => {
    if (!showMenu && isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 950); // match slideOut duration
      return () => clearTimeout(timer);
    }
  }, [showMenu, isVisible]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setShowMenu(false);
  };

  /** Dropdown sections by account type */
  const sectionsByRole = {
    Admin: [
      {
        title: "Account & User Management",
        links: [
          { to: "/admin/profile", label: "Profile Settings" },
          { to: "/admin/manage/users", label: "User Management" },
          { to: "/admin/roles", label: "Roles & Permissions" },
        ],
      },
      {
        title: "Product & Inventory",
        links: [
          { to: "/admin/manage/products", label: "Manage Products" },
          { to: "/admin/manage/products/new", label: "Add New Product" },
          { to: "/admin/manage/cats", label: "Manage Categories" },
          { to: "/admin/manage/cats/new", label: "Add New Category" },
          { to: "/admin/manage/cat-pictures", label: "Manage Category Pictures" },
          { to: "/admin/manage/cat-pictures/new", label: "Add New Category Picture" },
          { to: "/admin/inventory", label: "Inventory / Stock" },
        ],
      },
      {
        title: "Orders & Customers",
        links: [
          { to: "/admin/manage/contact-forms", label: "Contact Forms" },
          { to: "/admin/orders", label: "Orders Dashboard" },
          { to: "/admin/orders/abandoned", label: "Abandoned Carts" },
          { to: "/admin/customers", label: "Customers" },
        ],
      },
      {
        title: "Manufacturing / Ops",
        links: [
          { to: "/admin/production", label: "Production Queue" },
          { to: "/admin/materials", label: "Materials & Suppliers" },
          { to: "/admin/shipping", label: "Shipping & Logistics" },
        ],
      },
      {
        title: "Analytics & Marketing",
        links: [
          { to: "/admin/analytics/sales", label: "Sales Analytics" },
          { to: "/admin/analytics/customers", label: "Customer Insights" },
          { to: "/admin/marketing/coupons", label: "Promotions / Coupons" },
          { to: "/admin/seo", label: "SEO & Content" },
          { to: "/blog", label: "Blogs" },
          { to: "/admin/manage/blogs", label: "Manage Blogs" },
          { to: "/admin/manage/blogs/new", label: "Add New Blog" },
          // { to: "/admin/manage/blog-images", label: "Manage Blog Images" },
          // { to: "/admin/manage/blog-images/new", label: "Add New Blog Image" },
        ],
      },
      {
        title: "HR & Internal",
        links: [
          { to: "/admin/hr", label: "HR Resources" },
          { to: "/admin/hr/timesheets", label: "Timesheets" },
          { to: "/admin/hr/training", label: "Training / SOPs" },
        ],
      },
      {
        title: "System / Utilities",
        links: [
          { to: "/admin/settings", label: "Site Settings" },
          { to: "/admin/integrations", label: "Integrations" },
          { to: "/admin/logs", label: "Logs / Audit" },
        ],
      },
    ],
    Customer: [
      {
        title: "Account",
        links: [
          { to: "/orders", label: "My Orders" },
          { to: "/wishlist", label: "Wishlist" },
          { to: "/settings", label: "Account Settings" },
        ],
      },
    ],
    Contractor: [
      {
        title: "Projects",
        links: [
          { to: "/contractor/jobs", label: "My Jobs" },
          { to: "/contractor/bids", label: "Bids & Quotes" },
        ],
      },
    ],
    Retailer: [
      {
        title: "Sales Tools",
        links: [
          { to: "/retailer/orders", label: "Orders" },
          { to: "/retailer/catalog", label: "Catalog" },
        ],
      },
    ],
    Designer: [
      {
        title: "Design Resources",
        links: [
          { to: "/designer/portfolio", label: "My Portfolio" },
          { to: "/designer/templates", label: "Templates" },
        ],
      },
    ],
    Employee: [
      {
        title: "Work Tools",
        links: [
          { to: "/employee/timesheets", label: "Timesheets" },
          { to: "/employee/resources", label: "Resources" },
        ],
      },
    ],
    Dealer: [
      {
        title: "Dealer Center",
        links: [
          { to: "/dealer/orders", label: "Dealer Orders" },
          { to: "/dealer/pricing", label: "Pricing Sheets" },
        ],
      },
    ],
  };

  const accountType = user?.account_type || "Customer";
  const sections = sectionsByRole[accountType] || [];

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <button className="profile-button" onClick={toggleMenu}>
        <FaUserCircle />
      </button>

      {isVisible && (
        <div
          className={`profile-dropdown ${showMenu ? "show" : "hide"}`}
          ref={ulRef}
        >
          <button className="dropdown-close-btn" onClick={() => setShowMenu(false)}>
            <FiX size={20} />
          </button>

          {user ? (
            <>
              <div className="profile-info">
                <strong>{user.firstname} {user.lastname}</strong>
                <span>{user.email}</span>
                <Clock className="clock"/>
                <button onClick={logout} className="logout-button">
                  Log Out
                </button>

                <span className="span-profile"></span>
                {/* <div className="search-bar-container">
                  <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for products..."
                  />
              <NavLink to="/advanced-search" onClick={toggleMenu} className="public-link">Advanced Search</NavLink>
                </div> */}
                {/* <span className="span-profile"></span> */}
              {/* Public Links */}
              <NavLink to="/" onClick={toggleMenu} className="public-link">Home</NavLink>
              <NavLink to="/products" onClick={toggleMenu} className="public-link">Products</NavLink>
              {/* <NavLink to="/blog" onClick={toggleMenu} className="public-link">Blog</NavLink> */}
              {/* <NavLink to="/company" onClick={toggleMenu} className="public-link">Company</NavLink> */}
              <NavLink to="/contact" onClick={toggleMenu} className="public-link">Contact</NavLink>
              <NavLink to="/cart" onClick={toggleMenu} className="public-link">Cart</NavLink>
              <span className="span-profile"></span>
              </div>
              {sections.map((section) => {
                const isOpen = openSections[section.title];
                return (
                  <div key={section.title} className="dropdown-section">
                    <button
                      className={`section-toggle ${isOpen ? "open" : ""}`}
                      onClick={() => toggleSection(section.title)}
                    >
                      <span className="chevron">
                        <FaChevronDown />
                      </span>
                      <span className="section-title">{section.title}</span>
                    </button>
                    {isOpen && (
                      <div className="section-links">
                        {section.links.map((link) => (
                          <NavLink
                            key={link.to}
                            to={link.to}
                            className="dropdown-link"
                            onClick={() => setShowMenu(false)}
                          >
                            {link.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            </>
          ) : (
            <div className="profile-dropdown-items">
              <NavLink to="/login" onClick={toggleMenu} className="public-link">Login / Signup</NavLink>
              <Clock className="clock"/>
              <span className="span-profile"></span>
              {/* Public Links */}
               <div className="search-bar-container">
                  <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for products..."
                  />
              <NavLink to="/advanced-search" onClick={toggleMenu} className="public-link">Advanced Search</NavLink>
                </div>
                <span className="span-profile"></span>

              <NavLink to="/" onClick={toggleMenu} className="public-link">Home</NavLink>
              <NavLink to="/products" onClick={toggleMenu} className="public-link">Products</NavLink>
              {/* <NavLink to="/blog" onClick={toggleMenu} className="public-link">Blog</NavLink> */}
              <NavLink to="/company" onClick={toggleMenu} className="public-link">Company</NavLink>
              <NavLink to="/contact" onClick={toggleMenu} className="public-link">Contact</NavLink>
              <NavLink to="/cart" onClick={toggleMenu} className="public-link">Cart</NavLink>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
