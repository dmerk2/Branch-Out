/* RecentPost.jsx */

import React from 'react';
import styles from '../../styles/RecentPost.module.css';

export default function RecentPost() {
  return (
    <div>
      <div className={styles.postContainer}>
        <div className={styles.userDetails}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>John Doe</p>
            <p className={styles.postDate}>December 6, 2023</p>
          </div>
        </div>

        <div className={styles.userPost}>
          <p className={styles.postContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
          </p>
        </div>

        <div className={styles.engagementSection}>
          <div className={styles.comments}>
            <p className={styles.comment}>John Smith: Comment 1 - Great post!</p>
            <p className={styles.comment}>Jane Doe: Comment 2 - Keep it up!</p>
          </div>

          <div className={styles.likesDislikes}>
            <div className={styles.likeBox}>
              <button className={styles.likeButton}>Like</button>
            </div>
            <div className={styles.dislikeBox}>
              <button className={styles.dislikeButton}>Dislike</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
