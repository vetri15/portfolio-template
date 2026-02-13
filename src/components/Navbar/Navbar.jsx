import React, { useState, useEffect, useRef } from 'react';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import { personalInfo } from '../../data/portfolioData';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { handleAnchorClick } = useSmoothScroll();
  const menuRef = useRef(null);

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

  // Lock body scroll when menu is open
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
    { label: 'About', href: '#about', flagged: false, icon: '👤', description: 'Learn more about me' },
    { label: 'Skills', href: '#skills', flagged: true, icon: '⚡', description: 'Technologies I use' },
    { label: 'Projects', href: '#projects', flagged: true, icon: '🚀', description: 'My recent work' },
    { label: 'Experience', href: '#experience', flagged: false, icon: '💼', description: 'Career journey' },
    { label: 'Testimonials', href: '#testimonials', flagged: false, icon: '💬', description: 'What people say' },
  ];

  const socialLinks = [
    { label: 'GH', title: 'GitHub', url: '#' },
    { label: 'LI', title: 'LinkedIn', url: '#' },
    { label: 'TW', title: 'Twitter', url: '#' },
    { label: 'DR', title: 'Dribbble', url: '#' },
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

      {/* ===================== */}
      {/* MOBILE FULLSCREEN MENU */}
      {/* ===================== */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        {/* Mobile Menu Background Effects */}
        <div className="mobile-menu-bg-effects">
          <div className="mobile-orb mobile-orb-1" />
          <div className="mobile-orb mobile-orb-2" />
          <div className="mobile-orb mobile-orb-3" />
          <div className="mobile-grid-bg" />
        </div>

        {/* Mobile Menu Header */}
        <div className="mobile-menu-header">
          <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
            {personalInfo.shortName}
          </a>
          <div className="mobile-menu-badge">
            <span className="mobile-badge-dot" />
            Menu
          </div>
        </div>

        {/* Mobile Menu Navigation */}
        <div className="mobile-menu-nav">
          <div className="mobile-nav-label">Navigation</div>
          {navItems.map((item, index) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                href={item.href}
                className={`mobile-nav-item ${isActive ? 'active' : ''} ${item.flagged ? 'flagged' : ''}`}
                key={item.label}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{ animationDelay: `${0.1 + index * 0.06}s` }}
              >
                <div className="mobile-nav-item-left">
                  <div className={`mobile-nav-icon ${item.flagged ? 'icon-shimmer' : ''}`}>
                    {item.icon}
                  </div>
                  <div className="mobile-nav-text">
                    <span className="mobile-nav-label-text">{item.label}</span>
                    <span className="mobile-nav-desc">{item.description}</span>
                  </div>
                </div>
                <div className="mobile-nav-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                {item.flagged && <div className="mobile-nav-shimmer-line" />}
              </a>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mobile-menu-cta" style={{ animationDelay: '0.45s' }}>
          <a
            href="#contact"
            className="mobile-cta-button"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <div className="mobile-cta-glow" />
            <span className="mobile-cta-content">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Let's Talk
            </span>
          </a>
        </div>

        {/* Mobile Menu Footer */}
        <div className="mobile-menu-footer" style={{ animationDelay: '0.55s' }}>
          <div className="mobile-footer-socials">
            {socialLinks.map((link, index) => (
              <a
                href={link.url}
                className="mobile-social-link"
                title={link.title}
                key={index}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mobile-footer-email">
            <span className="mobile-email-icon">✉️</span>
            {personalInfo.email}
          </div>
          <div className="mobile-footer-copyright">
            © {new Date().getFullYear()} {personalInfo.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;