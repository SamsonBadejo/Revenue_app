import React from "react";
import "./Loader.css"; // Add a custom CSS file for better styling.

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <p className="loader-text">Processing your transactions...</p>
      </div>
    </>
  );
};

export default Loader;
