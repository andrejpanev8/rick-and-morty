import React from 'react';
import './LoadingAnimation.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;
