import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content text-center">
        <h1 className="error-title">
          4<span className="error-zero">0</span>4
        </h1>
        <h2 className="error-subtitle">Oops! Page not found</h2>
        <p className="error-text">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary error-button">
          Go to Official Page
        </Link>
      </div>
    </div>
  );
};

export default Error;
