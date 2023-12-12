import React from 'react';
import styles from "../../styles/HomepageUserDiamond.module.css";
import { useQuery } from '@apollo/client';
import { useParams} from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faUserGroup, faMessage, faEnvelope, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import HomePageDiamondButton from "./HomePageDiamondButton";
import AuthService from "../utils/auth"
import BranchOutLogo from "../../assets/images/BranchOut_Logo.svg";
import auth from '../utils/auth';

export default function HomepageUserDiamond() {
  const { id } = useParams();
  const isOwnProfile = !id; // If there is no ID parameter, it's the user's own profile

  // Get the user ID based on whether it's their own profile or another user's profile
  const userId = isOwnProfile ? auth.getProfile().data._id : id;

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data;

  const isLoggedIn = AuthService.loggedIn();

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
