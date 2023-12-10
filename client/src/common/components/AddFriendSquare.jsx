import styles from '../../styles/AddFriendSquare.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import AddFriendButton from './AddFriendButton.jsx';

export default function AddFriendSquare({ friend }) {
  // Check if friend is defined and has the expected properties
  if (!friend || !friend.username) {
    // Handle the case where friend is undefined or missing properties
    return null;
  }

  return (
    <div className={styles.outerSquare}>
      <div className={styles.innerSquare}>
        <FontAwesomeIcon icon={faUserAstronaut} className={styles.friendIcon} />
      </div>
      <div className={styles.friendUsername}>{friend.username}</div>
      <div className={styles.friendAddButton}><AddFriendButton userId={friend._id} /></div>
    </div>
  );
}
