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
  
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id }, // Pass the user ID to the query
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.user.friends);


  const friends = data?.user.friends || [];

  return (
    <div className={styles.profileFriendsInfo}>
      <p className={styles.profileFriendCount}>Friends: {friends.length}</p>
      <button className={styles.profileViewAllFriends}>View All</button>

      {friends.map((friend) => (
        <AddFriendSquare key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default ViewFriendsList;

