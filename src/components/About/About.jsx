import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { personalInfo, highlights, codeBlockLines } from '../../data/portfolioData';
import './About.css';

const About = () => {
  const sectionRef = useScrollReveal();
  const codeRef = useRef(null);

  useEffect(() => {
    const codeBlock = codeRef.current;
    if (!codeBlock) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lines = codeBlock.querySelectorAll('.code-line');
            lines.forEach((line, index) => {
              line.style.opacity = '0';
              line.style.transform = 'translateX(-10px)';
              line.style.transition = `all 0.4s ease ${index * 0.1}s`;
              setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
              }, 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(codeBlock);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-image-section reveal">
          <div className="about-image-card">
            <div className="about-code-block" ref={codeRef}>
              {codeBlockLines.map((line) => (
                <div className="code-line" key={line.number}>
                  <span className="code-line-number">{line.number}</span>
                  <span dangerouslySetInnerHTML={{ __html: line.content }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-text">
          <div className="reveal">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Turning ideas into
              <br />
              reality through code.
            </h2>
          </div>

          <div className="reveal reveal-delay-1">
            {personalInfo.aboutText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="about-highlights reveal reveal-delay-2">
            {highlights.map((item, index) => (
              <div className="highlight-item" key={index}>
                <span className="hi-icon">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;