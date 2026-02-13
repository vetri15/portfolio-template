import React, { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { contactLinks } from '../../data/portfolioData';
import './Contact.css';

const Contact = () => {
  const sectionRef = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="reveal">
          <span className="section-label centered">Get In Touch</span>
          <h2 className="contact-big-text">
            Let's build something{' '}
            <span className="gradient-text">amazing</span> together.
          </h2>
          <p className="contact-description">
            Have a project in mind or just want to chat? I'd love to hear from
            you. Drop me a message and I'll get back within 24 hours.
          </p>
        </div>

        <div className="contact-links reveal reveal-delay-1">
          {contactLinks.map((link, index) => (
            <a href={link.url} className="contact-link" key={index}>
              {link.icon} {link.text}
            </a>
          ))}
        </div>

        <form
          className="contact-form reveal reveal-delay-2"
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submit">
            <button
              type="submit"
              className={`btn-primary ${submitted ? 'btn-success' : ''}`}
            >
              {submitted ? (
                <span>✓ Message Sent!</span>
              ) : (
                <>
                  Send Message
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;