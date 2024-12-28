import React from "react";
import { LuScrollText } from "react-icons/lu";
import "./ErrorMessage.css";

const ErrorMessage = ({ clearFilters }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <LuScrollText className="icon" />
        <h2>No matching transaction found for the selected filter</h2>
        <p>Change your filters to see more results, or add a new product</p>

        <button onClick={clearFilters}>Clear Filter</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
