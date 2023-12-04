import styles from '../../styles/AboutMe.module.css';
import React from 'react';

export default function AboutMe() {
        return (
            <div className={styles.bigGreenSquare}>
                <p className={styles.aboutMe}>About Me</p>
                <p className={styles.userDescription}> I am a sample of a user for this really cool social media site.</p>
                <button className={styles.editButton}>Edit</button>
            </div>
        );
}