import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import profileImage from "../assets/pic2.jpg";

export const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/login`, { withCredentials: true })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        console.error("Profile fetch error:", err);
        alert("You must be logged in to view this page.");
      });
  }, []);

  return (
    <div className="account-settings-container">
      <h3>Account Settings</h3>

      <div className="account-box">
        <div className="profile-section">
          <div className="profile-img-wrapper">
            <img src={profileImage} alt="Profile" className="profile-img" />
            <div className="camera-icon">📷</div>
          </div>
          <div className="profile-info">
            <p className="name">{userData?.fullName || "Loading..."}</p>
            <p className="email">{userData?.email || ""}</p>
          </div>
        </div>

        <p className="description">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
          Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </div>
    </div>
  );
};
