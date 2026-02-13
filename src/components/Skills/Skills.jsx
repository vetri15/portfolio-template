import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { skills } from '../../data/portfolioData';
import './Skills.css';

const Skills = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <div className="skills-header reveal">
          <span className="section-label centered">What I Do</span>
          <h2 className="section-title">My expertise & skills</h2>
          <p className="section-subtitle">
            I specialize in building end-to-end solutions using modern
            technologies and best practices.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className={`skill-card reveal reveal-delay-${(index % 4) + 1}`}
              key={index}
            >
              <div className="skill-card-content">
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-tags">
                  {skill.tags.map((tag) => (
                    <span className="skill-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;