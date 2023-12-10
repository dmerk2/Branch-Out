import React from 'react';
import UserDiamond from "../components/UserDiamond.jsx";
import styles from "../../styles/ProfileUserDisplay.module.css";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path
import auth from '../utils/auth.js';

export default function ProfileUserDisplay() {

  const { id } = useParams(); // Get the user ID from the URL
  let userData = {};

  if (!id) {
    const user = auth.getProfile().data._id;
    const { loading, error, data } = useQuery(GET_USER_INFO, {variables: {"id": user}});
    userData = data;
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  } else {
      const { loading, error, data } = useQuery(GET_USER_INFO, {
        variables: { id }, // Pass the user ID to the query
      });
      userData = data;
    
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
  }
  
    return (
            <div className={styles.userDiamond_Horizontal_Container}>
              <UserDiamond profileImage={userData.user.profileImage} />
              <p className={styles.profileUsername}>{userData.user.username}</p>
            </div>

     );
}