import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { experiences } from '../../data/portfolioData';
import './Experience.css';

const Experience = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="experience-container">
        <div className="experience-header reveal">
          <span className="section-label centered">Career Path</span>
          <h2 className="section-title">Work experience</h2>
          <p className="section-subtitle">
            A journey of growth, learning, and building impactful products.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              className={`timeline-item reveal reveal-delay-${index + 1}`}
              key={index}
            >
              <div className="timeline-dot" />
              <div className="timeline-date">{exp.date}</div>
              <h3>{exp.title}</h3>
              <div className="timeline-company">{exp.company}</div>
              <ul>
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;