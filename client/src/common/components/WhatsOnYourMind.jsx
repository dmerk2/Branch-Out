import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import AuthService from "../utils/auth";

import styles from "../../styles/WhatsOnYourMind.module.css";
import { GET_USER_INFO } from "../utils/queries";
import { GET_ALL_POSTS } from "../utils/queries";

export default function WhatsOnYourMind() {
  const [content, setContent] = useState("");
  const loggedInUser = AuthService.getProfile();

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [ADD_POST, GET_USER_INFO, GET_ALL_POSTS],
  });

  const handlePost = async () => {
    // Check if the user is logged in
    if (!loggedInUser || !loggedInUser.data || !loggedInUser.data._id) {
      console.error("User not logged in or missing data");
      return;
    }

    const userId = loggedInUser.data;

    try {
      const result = await addPost({
        variables: { user: userId._id, content },
      });
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  return (
    <div className={styles.postMakingSquare}>
      <p className={styles.whatsUp}>What's on your mind?</p>
      <div className={styles.newPost}>
        <input
          className={styles.postInput}
          type="text"
          placeholder="[Insert Your Post Here]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className={styles.postButton} onClick={handlePost}>
        Post
      </button>
    </div>
  );
}
