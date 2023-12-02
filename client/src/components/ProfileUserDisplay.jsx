import React from 'react';
import UserDiamond from "../components/UserDiamond.jsx";
import styles from "../styles/ProfileUserDisplay.module.css";

export default function ProfileUserDisplay() {
    return (
            <div className={styles.userDiamond_Horizontal_Container}>
              <UserDiamond />
              <p className={styles.username}>SampleUser281</p>
            </div>

     );
}