import React from 'react';
import { marqueeItems } from '../../data/portfolioData';
import './Marquee.css';

const Marquee = () => {
  const doubledItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubledItems.map((item, index) => (
          <span className="marquee-item" key={index}>
            {item} <span className="sep">●</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;