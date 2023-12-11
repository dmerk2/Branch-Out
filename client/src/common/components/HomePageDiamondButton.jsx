import styles from '../../styles/HomePageDiamondButton.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DiamondButton({ icon, url }) {
    return (
        <a href={url} className={styles.diamondButton}>
            <FontAwesomeIcon icon={icon} className={styles.buttonIcon} />
        </a>
    );
}