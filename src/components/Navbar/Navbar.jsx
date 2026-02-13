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

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Overlay — tap to close */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-bg-effects">
          <div className="mobile-orb mobile-orb-1" />
          <div className="mobile-orb mobile-orb-2" />
        </div>

        {/* Back / Close Button */}
        <button className="mobile-back-btn" onClick={() => setMenuOpen(false)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Close
        </button>

        {/* Nav Links */}
        <div className="mobile-menu-nav">
          {navItems.map((item, index) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                href={item.href}
                className={`mobile-nav-item ${isActive ? 'active' : ''} ${item.flagged ? 'flagged' : ''}`}
                key={item.label}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{ animationDelay: `${0.08 + index * 0.05}s` }}
              >
                <span className="mobile-nav-label-text">{item.label}</span>
                {item.flagged && <span className="mobile-flagged-badge">✦</span>}
                <svg className="mobile-nav-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {item.flagged && <div className="mobile-nav-shimmer-line" />}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mobile-menu-cta" style={{ animationDelay: '0.4s' }}>
          <a
            href="#contact"
            className="mobile-cta-button"
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