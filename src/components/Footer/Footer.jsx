import React from 'react';
import { socialLinks } from '../../data/portfolioData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} Alex Morgan. Crafted with ☕ and passion.
        </p>
        <div className="footer-socials">
          {socialLinks.map((link, index) => (
            <a
              href={link.url}
              className="footer-social"
              title={link.title}
              key={index}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;