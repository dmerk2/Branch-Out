import React from 'react';
import styles from "../../styles/HomepageUserDiamond.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import DiamondButton from "./DiamondButton";

export default function HomepageUserDiamond() {
  return (
    <div className={styles.container}>
      <div className={styles.diamondShape}>
        <FontAwesomeIcon icon={faUserSecret} className={styles.userIcon} />
      </div>

      <div className={styles.buttonColumn}>
        <div className={styles.diamondButtonWrapper}>
          <DiamondButton />
        </div>
        <div className={styles.diamondButtonWrapper}>
          <DiamondButton />
        </div>
        <div className={styles.diamondButtonWrapper}>
          <DiamondButton />
        </div>
      </div>
    </div>
  );
}
