import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries'; // Adjust the import path
import styles from '../../styles/ViewFriendsList.module.css';
import AddFriendSquare from './AddFriendSquare';
import auth from '../utils/auth';

// Assuming your GraphQL query structure is similar to the example above

const ViewFriendsList = () => {

  const { id } = useParams(); // Get the user ID from the URL
  let userData = {};

  if (!id) {

    const user = auth.getProfile().data._id;
  const { loading, error, data } = useQuery(GET_USER_INFO, {variables: {"id": user}});
  userData = data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(userData.user.friends);

  } else {

    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id }, // Pass the user ID to the query
    });
    userData = data;
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    console.log(userData.user.friends);
  
  
  };
  
  const friends = userData?.user.friends || [];

  return (
    <div>
      <div className={styles.profileFriendsInfo}>
        <p className={styles.profileFriendCount}>Friends: {friends.length}</p>
        <button className={styles.profileViewAllFriends}>View All</button>
        </div>
      <div className={styles.justTheFriends}>
        {friends.map((friend) => (
          <AddFriendSquare key={friend._id} friend={friend} />
        ))}
      </div>
    </div>
   
  );
};

export default ViewFriendsList;

