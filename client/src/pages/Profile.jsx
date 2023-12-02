import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import UserDiamond from "../components/UserDiamond.jsx";

export default function Profile() {
  return (
    <body>
      <div class="row">
        <div className="column">
          <div className="user-info">
            <div className="flex-container">
              <UserDiamond />
              <p className="username">SampleUser281</p>
            </div>
          </div>
          <div className="user-actions">
            <button className="action-button discord-button">
              <FontAwesomeIcon icon={faUserSecret} className="action-icon" />
            </button>
            <button className="action-button github-button">
              <FontAwesomeIcon icon={faUserSecret} className="action-icon" />
            </button>
          </div>
          <div className="friends-info">
            <p className="friends-count">Friends: 21</p>
            <button className="view-all-button">View All</button>
          </div>
          <div className="rectangle rectangle1"></div>
          <div className="rectangle rectangle2"></div>
        </div>
        <div class="column">Column 2</div>
        <div class="column">Column 3</div>
      </div>
    </body>
  );
}
