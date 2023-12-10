import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import AuthService from "../utils/auth";

import styles from "../../styles/WhatsOnYourMind.module.css";

export default function WhatsOnYourMind() {
  const [content, setContent] = useState("");
  const loggedInUser = AuthService.getProfile();

  const [addPost] = useMutation(ADD_POST);

  const handlePost = async () => {
    // Check if the user is logged in
    if (!loggedInUser || !loggedInUser.data || !loggedInUser.data._id) {
      console.error("User not logged in or missing data");
      return;
    }

    const userId = loggedInUser.data;
    console.log("loggedInUser:", loggedInUser)
    console.log("userId:", userId);
    console.log(loggedInUser.data.username, "USERNAME");

    try {
      const result = await addPost({
        variables: {user: userId._id, content },
       
      });
      console.log(result, "from handle post")
      console.log("Post added successfully:", result);
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
