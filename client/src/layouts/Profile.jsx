import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import ProfileUserDisplay from "../common/components/ProfileUserDisplay.jsx";
import ViewFriendsList from "../common/components/ViewFriendsList.jsx";
import AddFriendSquare from "../common/components/AddFriendSquare.jsx";

export default function Profile() {
  return (

      <div className= {styles.profilePageRow}>
        <div className= { styles.profilePageColumn}>
          <div className={styles.profileUserSection}>
            < ProfileUserDisplay />
          </div>
          {/* <div className= {styles.profileOtherSocials}>
            <button className= {styles.profileOtherSocials}>
              <FontAwesomeIcon icon={faUserSecret} className= {styles.profileSocialsIcon} />
            </button>
            <button className="actionButton githubButton">
              <FontAwesomeIcon icon={faUserSecret} className= {styles.profileSocialsIcon} />
            </button>
          </div> */}
          <div className={styles.profileFriendsTracker}>
            < ViewFriendsList />
          </div>
          <div className={styles.profileAddFriends}>
            <AddFriendSquare />
            <AddFriendSquare />
          </div>
        </div>
        <div className= { styles.profilePageColumn}>Column 2</div>
        <div className= { styles.profilePageColumn}>Column 3</div>
      </div>
  );
}
