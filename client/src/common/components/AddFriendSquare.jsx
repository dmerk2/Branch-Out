import styles from '../../styles/AddFriendSquare.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

export default function AddFriendSquare() {
    return (
      <div className={styles.friendSquare}>
        <div className={styles.iconSquare}>
          <FontAwesomeIcon icon={faUserAstronaut} className={styles.friendIcon} />
        </div>
        <div className={styles.textSquare}>
          <p className={styles.friendUsername}>User123</p>
        </div>
      </div>
    );
  }