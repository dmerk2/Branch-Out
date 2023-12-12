import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/RecentPost.module.css";
import { LIKE_POST, DISLIKE_POST } from "../utils/mutations";
import { GET_ALL_POSTS } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import auth from "../utils/auth";



const RecentPost = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [likePostMutation] = useMutation(LIKE_POST);
  const [dislikePostMutation] = useMutation(DISLIKE_POST);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    refetchQueries: [ADD_COMMENT, GET_ALL_POSTS],
  });

  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  const handleAddComment = async (postId, content) => {
    // Update the function parameters
    try {
      // Check if content is not empty
      if (!content.trim()) {
        console.error("Comment content cannot be empty");
        return;
      }

      setAddingComment(true);

      const { data } = await addCommentMutation({
        variables: {
          post: postId,
          user: auth.getProfile().data._id,
          content: content,
        },
      });

      if (data.addComment) {
        console.log("Comment added successfully:", data.addComment);
        setAddingComment(false);
        setCommentContent("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setAddingComment(false);
    }
  };

  const CommentModal = ({ onClose, onSubmit }) => {
    const [localCommentContent, setLocalCommentContent] = useState("");

    const handleCommentSubmit = () => {

      // Check if localCommentContent is not empty
      if (!localCommentContent.trim()) {
        console.error("Comment content cannot be empty");
        return;
      }

      // Call onSubmit with postId and content
      onSubmit(localCommentContent);
      onClose();
    };

    
    
    return (
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p className={styles.modalText}>Post Your Comment!</p>
          <button className={styles.closeButton} onClick={() => onClose()}>
            &times;
          </button>
        </div>
        <textarea
          className={styles.modalTextArea}
          rows="4"
          cols="50"
          value={localCommentContent}
          onChange={(e) => setLocalCommentContent(e.target.value)}
        />
        <br />
        <div className={styles.modalButtons}>
          <button
            className={styles.commentButton}
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </button>
        </div>
      </div>
    );
  };
  
  const isLoggedIn = AuthService.loggedIn();

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className={styles.postContainer}>
          <div className={styles.userDetails}>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{post.user.username}</p>
              <p className={styles.postDate}>
                {new Date(parseInt(post.createdAt)).toLocaleString()}
              </p>
              </div>
            </div>
  
            <div className={styles.userPost}>
              <p className={styles.postContent}>{post.content}</p>
            </div>
            {isLoggedIn ? (
            <button
            className={styles.commentButton}
            onClick={() => setShowModal(true)}
          >
            Add a Comment
          </button>
          ) : (
            <button
            className={styles.commentButtonGone}
            onClick={() => setShowModal(true)}
          >
            Add a Comment
          </button>
          )}
          {/* Modal */}
          {showModal && (
            <CommentModal
              onClose={() => setShowModal(false)}
              onSubmit={(content) => handleAddComment(post._id, content)}
            />
          )}
          <div className={styles.engagementSection}>
            <div className={styles.comments}>
              {post.comments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <div className={styles.commentName}>
                    {comment.user.username}
                  </div>
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
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      color="var(--black-haze)"
                    />
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
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      color="var(--black-haze)"
                    />
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
