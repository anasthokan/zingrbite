import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="logo-section">
          <img
            src="/logo.png"
            alt="ZingR Bite Logo"
            className="nav-logo-img"
          />
          <Link to="/" className="nav-logo-text">
            ZingR <span>Bite</span>
          </Link>
        </div>

        {/* HAMBURGER ICON */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* NAVIGATION LINKS */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className={location.pathname === "/menu" ? "active" : ""}>
            <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
          </li>
          <li className={location.pathname === "/offers" ? "active" : ""}>
            <Link to="/offers" onClick={() => setIsOpen(false)}>Offers</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>

          {/* ORDER BUTTON */}
          <li>
            <button
              className="order-btn"
              onClick={() => window.open("https://wa.me/7758002642", "_blank")}
            >
              Order Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
