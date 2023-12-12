import styles from '../../styles/AddFriendSquare.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import AddFriendButton from './AddFriendButton.jsx';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export default function AddFriendSquare({ friend }) {
  // Check if friend is defined and has the expected properties
  if (!friend || !friend.username) {
    // Handle the case where friend is undefined or missing properties
    return null;
  }

  const profileLink = `/profile/${friend._id}`; // Adjust the link based on your route structure

  return (
    <div className={styles.outerSquare}>
      <Link to={profileLink} className={styles.innerSquare}>
        <FontAwesomeIcon icon={faUserAstronaut} className={styles.friendIcon} />
      </Link>
      <div className={styles.friendUsername}>{friend.username}</div>
      <div className={styles.friendAddButton}><AddFriendButton userId={friend._id} /></div>
    </div>
  );
}