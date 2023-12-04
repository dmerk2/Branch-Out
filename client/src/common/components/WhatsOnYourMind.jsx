import styles from "../../styles/WhatsOnYourMind.module.css";
import React from "react";

export default function WhatsOnYourMind() {
  return (
    <div className={styles.postMakingSquare}>
      <p className={styles.whatsUp}>What's on your mind?</p>
      <div className={styles.newPost}>
        <input
          className={styles.postInput}
          type="text"
          placeholder="[Insert Your Post Here]"
        />
      </div>
      <button className={styles.postButton}>Post</button>
    </div>
  );
}
