import React from 'react';
import styles from '../../styles/AddFriendButtonProfiles.module.css';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ADD_FRIEND } from '../utils/mutations';
import { GET_USER_INFO } from '../utils/queries';

const AddFriendButtonWithQuery = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id },
    });
  
    const user = data?.user;
    const [addFriend] = useMutation(ADD_FRIEND);
    console.log('Mutation Result:', data);

  
    const userId = user?.id;
  
    const handleAddFriend = async () => {
        try {
          if (user) {
            const userId = user._id; // Extract userId from the user object
      
            const { data } = await addFriend({ variables: { userId } });
      
            // Check if the friend was successfully added
            if (data.addFriend) {
              alert(`Friend added: ${data.addFriend.username}`);
            }
          }
        } catch (error) {
            // Check if the error is due to a duplicate friend request
            if (error.message.includes("duplicate friend request")) {
              alert(`${data.user.username} is already your friend!`);
            } else {
              // Handle other errors
              console.error(error);
            }
          }
      };
  
    return (
      <button type="button" onClick={handleAddFriend} className={styles.buttonAppearance}>
        Add Friend
      </button>
    );
  };
export default AddFriendButtonWithQuery;
