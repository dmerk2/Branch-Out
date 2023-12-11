import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/RecentPost.module.css";
import { LIKE_POST, DISLIKE_POST } from "../utils/mutations";
import { GET_ALL_POSTS } from "../utils/queries";

const RecentPost = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const [likePostMutation] = useMutation(LIKE_POST);
  const [dislikePostMutation] = useMutation(DISLIKE_POST);

  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  console.log(data , "data")
  const { user, posts } = data;


  const handleLikePost = async () => {
    if (userAction === "like") {
      // User already liked, remove like
      setUserAction(null);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      // User disliked before, remove dislike
      if (userAction === "dislike") {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }

      // Like the post
      setUserAction("like");
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
    if (userAction === "dislike") {
      // User already disliked, remove dislike
      setUserAction(null);
      setIsDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      // User liked before, remove like
      if (userAction === "like") {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }

      // Dislike the post
      setUserAction("dislike");
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
        {posts.map((post) => (
          <div key={post._id} className={styles.postContainer}>
            <div className={styles.userDetails}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{post.user.username}</p>
                <p className={styles.postDate}>{post.createdAt}</p>
              </div>
            </div>
  
            <div className={styles.userPost}>
              <p className={styles.postContent}>{post.content}</p>
            </div>
  
            <div className={styles.engagementSection}>
              <div className={styles.comments}>
                {post.comments.map((comment) => (
                  <div key={comment._id} className={styles.comment}>
                    <div className={styles.commentName}>{comment.user}</div>
                    <div className={styles.commentBody}>{comment.content}</div>
                  </div>
                ))}
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
        ))}
      </div>
    );
  };
  
  export default RecentPost;