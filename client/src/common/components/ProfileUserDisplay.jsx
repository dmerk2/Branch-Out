import React from 'react';
import UserDiamond from "../components/UserDiamond.jsx";
import styles from "../../styles/ProfileUserDisplay.module.css";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path

export default function ProfileUserDisplay() {
  const { id } = useParams(); // Get the user ID from the URL
  
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id }, // Pass the user ID to the query
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    return (
            <div className={styles.userDiamond_Horizontal_Container}>
              <UserDiamond profileImage={data.user.profileImage} />
              <p className={styles.profileUsername}>{data.user.username}</p>
            </div>

     );
}