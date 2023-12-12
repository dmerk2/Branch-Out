import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_USER_INFO } from '../utils/queries';
import styles from '../../styles/ViewFriendsList.module.css';
import AddFriendSquare from './AddFriendSquare';
import auth from '../utils/auth';

const ViewFriendsList = () => {
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
  const friends = userData?.user.friends || [];

  return (
    <div>
      <div className={styles.profileFriendsInfo}>
        <p className={styles.profileFriendCount}>Friends: {friends.length}</p>
        {/* Dynamically set the link based on whether it's their own profile or another user's profile */}
        <Link to={`/${userId}/friends`}>
          <button className={styles.profileViewAllFriends}>View All</button>
        </Link>
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
