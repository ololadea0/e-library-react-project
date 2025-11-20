import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        <div className="top-footer">
          <div className="footer-logo">
            <div className="footer-logo-img">
              <img src="/img/dn logo.jpeg" alt="E-Library logo" />
            </div>
            <div className="brand">E-Library</div>
            <div className="small">
              Free Islamic books • Accessible • Mobile friendly
            </div>
          </div>

          <div className="footer-links" aria-label="Footer navigation">
            <nav className="footer-column" aria-label="Explore">
              <h4>Explore</h4>
              <NavLink to="/library">Library</NavLink>
              <NavLink to="/categories">Categories</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>

            <nav className="footer-column" aria-label="Support">
              <h4>Support</h4>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/privacy">Privacy</NavLink>
            </nav>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {year} E-Library. All rights reserved.</div>
        <div>Built with Love ❤️ • </div>
        <div className="socials" aria-label="Social links">
          <a href="https://www.facebook.com/dawahnigeria/">
            <img src="/img/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/dawahnigeria/">
            <img src="/img/instagram.png" alt="instagram" />
          </a>
          <a href="https://x.com/dawahnigeria">
            <img src="/img/twitter.png" alt="X" />
          </a>
          <a href="https://www.youtube.com/dawahnigeria">
            <img src="/img/youtube.png" alt="youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
}
