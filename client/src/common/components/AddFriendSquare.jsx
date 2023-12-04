import styles from '../../styles/AddFriendSquare.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

export default function AddFriendSquare() {
    return (
      <div className={styles.outerSquare}>
        <div className={styles.innerSquare}>
        <FontAwesomeIcon icon={faUserAstronaut} className={styles.friendIcon} />
        </div>
        <div className={styles.friendUsername}>Test123</div>
      </div>
    );
  }