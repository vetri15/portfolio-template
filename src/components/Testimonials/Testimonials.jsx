import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { testimonials } from '../../data/portfolioData';
import './Testimonials.css';

const Testimonials = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="testimonials-header reveal">
          <span className="section-label centered">Testimonials</span>
          <h2 className="section-title">What people say</h2>
          <p className="section-subtitle">
            Kind words from clients and colleagues I've had the pleasure of
            working with.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              className={`testimonial-card reveal reveal-delay-${index + 1}`}
              key={index}
            >
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.initials}</div>
                <div className="testimonial-author-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;