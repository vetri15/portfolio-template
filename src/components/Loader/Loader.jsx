import React from 'react';
import './Loader.css';

const Loader = ({ loading }) => {
  return (
    <div className={`page-loader ${!loading ? 'loaded' : ''}`}>
      <div className="loader-content">
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default Loader;