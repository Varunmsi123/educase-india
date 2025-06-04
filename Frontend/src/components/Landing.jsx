import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export const Landing = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1 className="welcome-title">
          Welcome to <span className="highlight">PopX</span>
        </h1>
        <p className="welcome-text">
          Join PopX to unlock exclusive features and connect with our amazing community!
        </p>
        <Link to="/register" >
           <button className="create-account-btn">Create Account</button>
        </Link>
        <Link to="/login" className="login-link">
          Already Registered? Login
        </Link>
      </div>
    </div>
  );
};

