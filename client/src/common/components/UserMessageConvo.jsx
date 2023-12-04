import React from 'react';
import styles from "../../styles/UserMessageConvo.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function UserMessageConvo() {
    return (
            <div className={styles.userMessageLine}>
              <div className= { styles.smallDiamondShape}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.messageIcon} />
            </div> 
              <p className={styles.messageUsername}>TestUser231</p>
            </div>

     );
}