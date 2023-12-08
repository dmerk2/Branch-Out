import styles from '../../styles/AboutMe.module.css';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path

export default function AboutMe() {
    const { loading, error, data } = useQuery(GET_USER_INFO);

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