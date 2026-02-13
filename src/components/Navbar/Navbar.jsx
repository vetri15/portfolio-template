import React, { useState, useEffect } from 'react';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import { personalInfo } from '../../data/portfolioData';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { handleAnchorClick } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50);

      // Detect active section
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset + 200;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', flagged: false },
    { label: 'Skills', href: '#skills', flagged: true },
    { label: 'Projects', href: '#projects', flagged: true },
    { label: 'Experience', href: '#experience', flagged: false },
  ];

  const handleNavClick = (e, href) => {
    handleAnchorClick(e, href);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          {personalInfo.shortName}
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <li key={item.label}>
                {item.flagged ? (
                  <div className={`shimmer-border-wrapper ${isActive ? 'active' : ''}`}>
                    <div className="shimmer-border-bg" />
                    <a
                      href={item.href}
                      className="nav-link-shimmer"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span className="shimmer-dot" />
                      {item.label}
                    </a>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={isActive ? 'nav-active' : ''}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="nav-cta"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Let's Talk
            </a>
          </li>
        </ul>

        <div
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;