import React from 'react';
import styles from "../../styles/HomepageUserDiamond.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faUserGroup, faMessage, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import HomePageDiamondButton from "./HomePageDiamondButton";

export default function HomepageUserDiamond() {
  const buttons = [
    { icon: faUserGroup, url: '/friends' },
    { icon: faMessage, url: '/chatroom' },
    { icon: faEnvelope, url: '/profile' },
    // Add more objects as needed
  ];

  return (
    <div className={styles.container}>
      <div className={styles.diamondShape}>
        <FontAwesomeIcon icon={faUserSecret} className={styles.userIcon} />
      </div>

      <div className={styles.buttonColumn}>
        {buttons.map((button, index) => (
          <div className={styles.diamondButtonWrapper} key={index}>
            <HomePageDiamondButton icon={button.icon} url={button.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
