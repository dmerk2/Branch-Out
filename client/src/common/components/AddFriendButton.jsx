import React from "react";
import styles from "../../styles/AddFriendButton.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_INFO } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
import auth from "../utils/auth";

const AddFriendButton = ({ userId }) => {
  // Query to get user information
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: userId },
  });

  // Mutation to add a friend
  const [addFriend] = useMutation(ADD_FRIEND, {
    refetchQueries: [ADD_FRIEND, GET_USER_INFO],
  });

  // Handle errors
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract user data
  const signedInUserId = data.user.signedInUserId;
  const isFriend =
    data.user.friends &&
    data.user.friends.some((friend) => friend._id === signedInUserId);

  // Handle adding friend
  const handleAddFriend = async () => {
    // Check if the user is authenticated
    const isLoggedIn = auth.loggedIn();
    if (!isLoggedIn) {
      alert("You must be logged in to add a friend.");
      return;
    }

    try {
      const { data } = await addFriend({ variables: { userId } });

      // Check if the friend was successfully added
      if (data.addFriend) {
        alert(`Friend added!`);
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

  // Render the button conditionally
  return (
    <div>
      {!isFriend && (
        <button
          type="button"
          onClick={handleAddFriend}
          className={styles.friendButton}
        >
          Add Friend
        </button>
      )}
    </div>
  );
};

export default AddFriendButton;
