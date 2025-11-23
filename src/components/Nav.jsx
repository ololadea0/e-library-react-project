import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // close mobile menu when resizing to large screens
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="navbar" role="navigation" aria-label="Main navigation">
      <div className="logo-img">
        <img
          src={`${import.meta.env.BASE_URL}img/dn-logo.jpeg`}
          alt="Dawah Nigeria Logo"
        />
      </div>

      <button
        type="button"
        className={`nav-toggle ${open ? "open" : ""}`}
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="hamburger-">&#9776;</span>
      </button>

      <nav
        id="primary-navigation"
        className={`nav-links ${open ? "open" : ""}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Library
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
