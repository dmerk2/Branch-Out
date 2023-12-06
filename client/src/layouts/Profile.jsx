import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import ProfileUserDisplay from "../common/components/ProfileUserDisplay.jsx";
import ViewFriendsList from "../common/components/ViewFriendsList.jsx";
import AddFriendSquare from "../common/components/AddFriendSquare.jsx";
import AboutMe from "../common/components/AboutMe.jsx";
import DiamondButton from "../common/components/DiamondButton.jsx";
import WhatsOnYourMind from "../common/components/WhatsOnYourMind.jsx";
import UnreadMessageBoard from "../common/components/UnreadMessageBoard.jsx";

export default function Profile() {
  return (

      <div className= {styles.profilePageRow}>
        <div className= { styles.profilePageColumn}>
          <div className={styles.profileUserSection}>
            < ProfileUserDisplay />
          </div>
          <div className={styles.profileFriendsTracker}>
            < ViewFriendsList />
          </div>
          <div className={styles.profileAddFriends}>
            <AddFriendSquare />
            <AddFriendSquare />
          </div>
        </div>
        <div className= { styles.profilePageColumn}>
          <AboutMe />
          <div className={styles.profileButtonRow}>
            <div className={styles.profileButton}><DiamondButton /></div>
            <div className={styles.profileButton}><DiamondButton /></div>
            <div className={styles.profileButton}><DiamondButton /></div>
          </div>
          <WhatsOnYourMind />
        </div>
        <div className= { styles.profilePageColumn}>
          <UnreadMessageBoard />
          </div>
      </div>
  );
}
