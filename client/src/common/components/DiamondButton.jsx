import styles from '../../styles/DiamondButton.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

export default function HexagonButton() {
    return (
        <div className= { styles.diamondButton}>
                <FontAwesomeIcon icon={faImages} className= { styles.buttonIcon } />
        </div>
      );
  }