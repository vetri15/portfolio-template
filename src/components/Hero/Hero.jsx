import React, { useEffect, useRef } from 'react';
import useCountUp from '../../hooks/useCountUp';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import { personalInfo, stats } from '../../data/portfolioData';
import './Hero.css';

const StatItem = ({ target, label }) => {
  const { count, ref } = useCountUp(target);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Hero = () => {
  const { handleAnchorClick } = useSmoothScroll();
  const orbsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      orbsRef.current.forEach((orb, i) => {
        if (orb) {
          const speed = i === 0 ? 0.3 : 0.15;
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid" />
      <div className="hero-glow-orb" ref={(el) => (orbsRef.current[0] = el)} />
      <div className="hero-glow-orb" ref={(el) => (orbsRef.current[1] = el)} />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Available for freelance work
          </div>

          <h1 className="hero-heading">
            <span className="line">
              {personalInfo.heroHeading[0]}{' '}
            </span>
            <span className="line">
              <span className="gradient-text">experiences</span> that
            </span>
            <span className="line">{personalInfo.heroHeading[2]}</span>
          </h1>

          <p className="hero-description">{personalInfo.heroDescription}</p>

          <div className="hero-actions">
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => handleAnchorClick(e, '#projects')}
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => handleAnchorClick(e, '#contact')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Get in Touch
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <StatItem key={stat.label} target={stat.target} label={stat.label} />
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <div className="hero-image-ring" />
            <div className="hero-image-ring" />
            <div className="hero-image">
              <div className="hero-image-placeholder">👨‍💻</div>
            </div>

            <div className="hero-floating-card fc-1">
              <div className="floating-icon" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>⚛️</div>
              <div>
                <div className="floating-card-text">React.js</div>
                <div className="floating-card-sub">Expert Level</div>
              </div>
            </div>

            <div className="hero-floating-card fc-2">
              <div className="floating-icon" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>🎨</div>
              <div>
                <div className="floating-card-text">UI/UX Design</div>
                <div className="floating-card-sub">Figma & Sketch</div>
              </div>
            </div>

            <div className="hero-floating-card fc-3">
              <div className="floating-icon" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>🚀</div>
              <div>
                <div className="floating-card-text">Performance</div>
                <div className="floating-card-sub">99 Lighthouse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;