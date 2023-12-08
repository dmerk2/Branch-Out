import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_POST, DISLIKE_POST } from "../utils/mutations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import styles from "../../styles/RecentPost.module.css";

export default function RecentPost({ postId }) {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const [likePostMutation] = useMutation(LIKE_POST);
  const [dislikePostMutation] = useMutation(DISLIKE_POST);

  const handleLikePost = async () => {
    if (userAction === 'like') {
      // User already liked, remove like
      setUserAction(null);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      // User disliked before, remove dislike
      if (userAction === 'dislike') {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }

      // Like the post
      setUserAction('like');
      setIsLiked(true);

      try {
        const { data, errors } = await likePostMutation({
          variables: { postId },
        });

        if (errors) {
          console.error("Error liking post:", errors);
        } else if (data.likePost && data.likePost.message) {
          alert(data.likePost.message);
        } else {
          setLikeCount(data.likePost.likeCount);
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const handleDislikePost = async () => {
    if (userAction === 'dislike') {
      // User already disliked, remove dislike
      setUserAction(null);
      setIsDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      // User liked before, remove like
      if (userAction === 'like') {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }

      // Dislike the post
      setUserAction('dislike');
      setIsDisliked(true);

      try {
        const { data, errors } = await dislikePostMutation({
          variables: { postId },
        });

        if (errors) {
          console.error("Error disliking post:", errors);
        } else if (data.dislikePost && data.dislikePost.message) {
          alert(data.dislikePost.message);
        } else {
          setDislikeCount(data.dislikePost.dislikeCount);
        }
      } catch (error) {
        console.error("Error disliking post:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.postContainer}>
        <div className={styles.userDetails}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>John Doe</p>
            <p className={styles.postDate}>December 6, 2023</p>
          </div>
        </div>

        <div className={styles.userPost}>
          <p className={styles.postContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi.
          </p>
        </div>

        <div className={styles.engagementSection}>
          <div className={styles.comments}>
            <p className={styles.comment}>
              <div className={styles.commentName}>John Smith</div>
              <div className={styles.commentBody}>Great post!</div>
            </p>
            <p className={styles.comment}>
            <div className={styles.commentName}>Jane Smith</div>
              <div className={styles.commentBody}>This is an incredible message!</div>
            </p>
          </div>

          <div className={styles.likesDislikes}>
            <div className={styles.likeBox}>
              <button
                className={styles.likeButton}
                onClick={() => handleLikePost()}
                disabled={isLiked}
              >
               <div className={styles.voteIcons}>
                <FontAwesomeIcon icon={faThumbsUp} color="var(--black-haze)" />
               </div>
               ({likeCount})
              </button>
            </div>
            <div className={styles.dislikeBox}>
              <button
                className={styles.dislikeButton}
                onClick={() => handleDislikePost()}
                disabled={isDisliked}
              >
                <div className={styles.voteIcons}>
                <FontAwesomeIcon icon={faThumbsDown} color="var(--black-haze)" />
                </div>
                ({dislikeCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
