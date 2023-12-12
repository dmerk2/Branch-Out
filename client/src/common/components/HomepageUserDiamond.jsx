import React from 'react';
import styles from "../../styles/HomepageUserDiamond.module.css";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faUserGroup, faMessage, faEnvelope, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import HomePageDiamondButton from "./HomePageDiamondButton";
import auth from "../utils/auth";
import BranchOutLogo from "../../assets/images/BranchOut_Logo.svg";

export default function HomepageUserDiamond() {
  const { id } = useParams();
  const isLoggedIn = auth.loggedIn();
  
  
  // Get the user ID based on whether it's their own profile or another user's profile
  const userId = isLoggedIn ? auth.getProfile().data._id : id;
  
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: userId },
    skip: !isLoggedIn, // Skip the query when the user is not logged in
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    // Handle the error, e.g., by displaying a message
    console.error(error);
    return <p>Error loading user data</p>;
  }
  
  const userData = data;
  
  const buttons = isLoggedIn
  ? [
    { icon: faUserGroup, url: `/${userId}/friends` },
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

  if (!isLoggedIn && !id) {
    // Handle the case where the user is logged out and no user ID is available
    return (
      <div className={styles.container}>
      <div className={styles.diamondShape}>
          <img src={BranchOutLogo} alt="BranchOut Logo" className={styles.logoStyling} />
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
