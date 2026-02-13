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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { label: 'About', href: '#about', flagged: false },
    { label: 'Skills', href: '#skills', flagged: true },
    { label: 'Projects', href: '#projects', flagged: true },
    { label: 'Experience', href: '#experience', flagged: false },
    { label: 'Testimonials', href: '#testimonials', flagged: false },
  ];

  const handleNavClick = (e, href) => {
    handleAnchorClick(e, href);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
            {personalInfo.shortName}
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links-desktop">
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

          {/* Hamburger */}
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

      {/* Blurred backdrop — tap to close */}
      <div
        className={`mobile-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Right-side partial drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>

        {/* Close button */}
        <button className="drawer-close-btn" onClick={() => setMenuOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Nav items */}
        <div className="drawer-nav">
          {navItems.map((item, index) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                href={item.href}
                className={`drawer-nav-item ${isActive ? 'active' : ''} ${item.flagged ? 'flagged' : ''}`}
                key={item.label}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{ animationDelay: `${0.06 + index * 0.05}s` }}
              >
                <span className="drawer-nav-text">{item.label}</span>
                {item.flagged && <span className="drawer-flagged-star">✦</span>}
                <svg className="drawer-nav-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {item.flagged && <div className="drawer-shimmer-line" />}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="drawer-cta" style={{ animationDelay: '0.35s' }}>
          <a
            href="#contact"
            className="drawer-cta-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;