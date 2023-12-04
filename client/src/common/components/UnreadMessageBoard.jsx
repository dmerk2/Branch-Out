import styles from '../../styles/UnreadMessageBoard.module.css';
import React from 'react';
import UserMessageConvo from "../components/UserMessageConvo.jsx";

export default function UnreadMessageBoard() {
        return (
            <div className={styles.bigGreenMessageSquare}>
                <p className={styles.unreadMessages}>Messages  [3 Unread]</p>
                < UserMessageConvo />
                < UserMessageConvo />
                < UserMessageConvo />
            </div>
        );
}