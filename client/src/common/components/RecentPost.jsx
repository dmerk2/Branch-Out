import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/RecentPost.module.css";
import { ADD_COMMENT } from "../utils/mutations";
import { GET_ALL_POSTS } from "../utils/queries";
import auth from "../utils/auth";

const RecentPost = ({ postId, userId }) => {
  // const [likeCount, setLikeCount] = useState(0);
  // const [dislikeCount, setDislikeCount] = useState(0);
  // const [userAction, setUserAction] = useState(null);
  // const [isLiked, setIsLiked] = useState(false);
  // const [isDisliked, setIsDisliked] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  // const [likePostMutation] = useMutation(LIKE_POST);
  // const [dislikePostMutation] = useMutation(DISLIKE_POST);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    refetchQueries: [ADD_COMMENT, GET_ALL_POSTS],
  });
  // const [unlikePostMutation] = useMutation(UNLIKE_POST);
  // const [undislikePostMutation] = useMutation(UNDISLIKE_POST);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  let loggedinuser;
  if (auth.getToken()) {
    loggedinuser = auth.getProfile().data?._id;
  }

  const { user, posts } = data || {};
  // useEffect(() => {
  //   if (data && data.posts) {
  //     const post = data.posts.find((p) => p._id === postId);
  //     if (post) {
  //       setLikeCount(post.likes.length);
  //       setDislikeCount(post.dislikes.length);
  //     }
  //   }
  // }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const handleLikePost = async (postId) => {
  //   const post = data.posts.find((p) => p._id === postId);
  //   const userHasLiked = post.likes.some((like) => like._id === loggedinuser);

  //   if (userHasLiked) {
  //     await unlikePostMutation({
  //       variables: { postId, userId: loggedinuser },
  //       refetchQueries: [{ query: GET_ALL_POSTS }],
  //     });
  //   } else {
  //     await likePostMutation({
  //       variables: { postId, userId: loggedinuser },
  //       refetchQueries: [{ query: GET_ALL_POSTS }],
  //     });
  //   }
  // };

  // const handleDislikePost = async (postId) => {
  //   const post = data.posts.find((p) => p._id === postId);
  //   const userHasDisliked = post.dislikes.some(
  //     (dislike) => dislike._id === loggedinuser
  //   );

  //   if (userHasDisliked) {
  //     await undislikePostMutation({
  //       variables: { postId, userId: loggedinuser },
  //       refetchQueries: [{ query: GET_ALL_POSTS }],
  //     });
  //   } else {
  //     await dislikePostMutation({
  //       variables: { postId, userId: loggedinuser },
  //       refetchQueries: [{ query: GET_ALL_POSTS }],
  //     });
  //   }
  // };

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

  const isLoggedIn = auth.loggedIn();

  return (
    <div>
      {data.posts.map((post) => (
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
              onClick={() => {
                setShowModal(true);
                setActivePostId(post._id);
              }}
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
              onSubmit={(content) => handleAddComment(activePostId, content)}
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

            {/* <div className={styles.likesDislikes}>
              <div className={styles.likeBox}>
                <button
                  className={styles.likeButton}
                  onClick={() => handleLikePost(post._id)}
                  disabled={isLiked}
                >
                  <div className={styles.voteIcons}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      color="var(--black-haze)"
                    />
                  </div>
                  ({post.likes.length})
                </button>
              </div>
              <div className={styles.dislikeBox}>
                <button
                  className={styles.dislikeButton}
                  onClick={() => handleDislikePost(post._id)}
                  disabled={isDisliked}
                >
                  <div className={styles.voteIcons}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      color="var(--black-haze)"
                    />
                  </div>
                  ({post.dislikes.length})
                </button>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPost;
