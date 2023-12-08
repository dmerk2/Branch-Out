import styles from '../../styles/AboutMe.module.css';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path
import auth from '../utils/auth';

export default function AboutMe() {
   
    const user = auth.getProfile().data._id;
    const { loading, error, data } = useQuery(GET_USER_INFO, {variables: {"id": user}});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(user, 'LOOK HERE');
  console.log(data, 'TEST HERE');
        return (
            <div className={styles.bigGreenSquare}>
                <p className={styles.aboutMe}>About Me</p>
                <p className={styles.userDescription}>{data.user.bio}</p>
                <button className={styles.editButton}>Edit</button>
            </div>
        );
}