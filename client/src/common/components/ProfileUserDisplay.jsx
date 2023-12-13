import React from "react";
import UserDiamond from "../components/UserDiamond.jsx";
import styles from "../../styles/ProfileUserDisplay.module.css";

export default function ProfileUserDisplay({ userInfo }) {
  return (
    <div className={styles.userDiamond_Horizontal_Container}>
      <UserDiamond profileImage={userInfo.profileImage} />
      <p className={styles.profileUsername}>{userInfo.username}</p>
    </div>
  );
}
