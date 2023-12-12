import React from 'react';
import styles from "../../styles/HomepageUserDiamond.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faUserGroup, faMessage, faEnvelope, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import HomePageDiamondButton from "./HomePageDiamondButton";
import AuthService from "../utils/auth"
import BranchOutLogo from "../../assets/images/BranchOut_Logo.svg";

export default function HomepageUserDiamond() {
  const isLoggedIn = AuthService.loggedIn();

  const buttons = isLoggedIn
    ? [
        { icon: faUserGroup, url: '/friends' },
        { icon: faMessage, url: '/chatroom' },
        { icon: faEnvelope, url: '/profile' },
        // Add more objects as needed
      ]
    : [
      { icon: faMessage, url: '/chatroom' },
      { icon: faRightToBracket, url: '/login' },
       // Icons to display when the user is not logged in
        // { icon: faIconName, url: '/url' },
      ];

  return (
    <div className={styles.container}>
      <div className={styles.diamondShape}>
      {isLoggedIn ? (
        <FontAwesomeIcon icon={faUserSecret} className={styles.userIcon} />
      ) : (
        <img src={BranchOutLogo} alt="BranchOut Logo" className={styles.logoStyling} />
      )}
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
