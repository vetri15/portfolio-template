import React, { useCallback } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { projects } from '../../data/portfolioData';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 8;
    const tiltY = (x - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = '';
  }, []);

  return (
    <div
      className={`project-card reveal reveal-delay-${(index % 4) + 1}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image">
        <div
          className="project-image-bg"
          style={{ background: project.gradient }}
        >
          {project.emoji}
        </div>
        <div className="project-image-overlay" />
        <div className="project-links-overlay">
          <a href={project.liveUrl} className="project-link-btn" title="Live Demo">
            ↗
          </a>
          <a href={project.codeUrl} className="project-link-btn" title="Source Code">
            ⟨/⟩
          </a>
        </div>
      </div>
      <div className="project-info">
        <div className="project-category">{project.category}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-header reveal">
          <span className="section-label centered">Selected Work</span>
          <h2 className="section-title">Featured projects</h2>
          <p className="section-subtitle">
            A collection of projects that showcase my skills and passion for
            building great products.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;