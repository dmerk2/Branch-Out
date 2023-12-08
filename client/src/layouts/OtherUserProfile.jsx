import React from "react";
import styles from "../styles/Profile.module.css";
import ProfileUserDisplay from "../common/components/ProfileUserDisplay.jsx";
import ViewFriendsList from "../common/components/ViewFriendsList.jsx";
import AddFriendSquare from "../common/components/AddFriendSquare.jsx";
import AboutMe from "../common/components/AboutMe.jsx";
import DiamondButton from "../common/components/DiamondButton.jsx";
import SendMessageButton from "../common/components/SendMessage"
import UserPosts from "../common/components/UserPosts.jsx";

export default function OtherUserProfile() {
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
          <div><UserPosts/></div>
        </div>
        <div className= { styles.profilePageColumn}>
        <SendMessageButton />
          </div>
      </div>
  );
}