import React from 'react';
import UserDiamond from "../components/UserDiamond.jsx";
import styles from "../../styles/ProfileUserDisplay.module.css";
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path

export default function ProfileUserDisplay() {

  const { loading, error, data } = useQuery(GET_USER_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    return (
            <div className={styles.userDiamond_Horizontal_Container}>
              <UserDiamond />
              <p className={styles.profileUsername}>{data.user.username}</p>
            </div>

     );
}