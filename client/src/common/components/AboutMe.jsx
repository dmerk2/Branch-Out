import styles from '../../styles/AboutMe.module.css';
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path
import auth from '../utils/auth';

export default function AboutMe() {

    const { id } = useParams(); // Get the user ID from the URL
  
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id }, // Pass the user ID to the query
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  console.log(data);
        return (
            <div className={styles.bigGreenSquare}>
                <p className={styles.aboutMe}>About Me</p>
                <p className={styles.userDescription}>{data.user.bio}</p>
                <button className={styles.editButton}>Edit</button>
            </div>
        );
}