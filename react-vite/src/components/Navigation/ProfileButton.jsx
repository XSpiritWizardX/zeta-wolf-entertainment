import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import "./ProfileButton.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
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
  const navigate = useNavigate();

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
  const closeMenu = () => setShowMenu(false);
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
    navigate('/')

  };

  /** Dropdown sections by account type */
  const sectionsByRole = {
    Admin: [
      {
        title: "Account & User Management",
        links: [
          { to: "/admin/profile", label: "Profile Settings" },
          { to: "/admin/manage/users", label: "User Management" },
          { to: "/admin/manage/contact-forms", label: "Contact Forms" },
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
        ],
      },
      {
        title: "HR & Internal",
        links: [
          { to: "/admin/hr", label: "HR Resources" },
          { to: "/admin/hr/training", label: "Training / SOPs" },
          { to: "/employee/timesheets", label: "Timesheets" },
          { to: "/employee/resources", label: "Resources" },
        ],
      },
    ],
    Employee: [
      {
        title: "Work Tools",
        links: [
          { to: "/admin/profile", label: "Profile Settings" },
          { to: "/employee/timesheets", label: "Timesheets" },
          { to: "/employee/resources", label: "Resources" },
          { to: "/admin/hr/training", label: "Training / SOPs" },
        ],
      },
    ],
    Customer: [
      {
        title: "Settings",
        links: [
          { to: "/admin/profile", label: "Profile Settings" },
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

              <NavLink to="/" onClick={toggleMenu} className="public-link">Home</NavLink>
              <NavLink to="/company" onClick={toggleMenu} className="public-link">Company</NavLink>
              <NavLink to="/services" onClick={toggleMenu} className="public-link">Services</NavLink>
              <NavLink to="/contact" onClick={toggleMenu} className="public-link">Contact</NavLink>
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
                 <div
            className="auth-button-container"
            >
              <OpenModalButton
                className="auth-butto"
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                className="auth-button"
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
              <Clock className="clock"/>
              <span className="span-profile"></span>
              <NavLink to="/" onClick={toggleMenu} className="public-link">Home</NavLink>
              <NavLink to="/services" onClick={toggleMenu} className="public-link">Services</NavLink>
              <NavLink to="/company" onClick={toggleMenu} className="public-link">Company</NavLink>
              <NavLink to="/contact" onClick={toggleMenu} className="public-link">Contact</NavLink>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
