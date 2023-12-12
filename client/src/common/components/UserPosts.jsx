import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_INFO } from "../utils/queries";
import {
  LIKE_POST,
  DISLIKE_POST,
  ADD_COMMENT,
  UNDISLIKE_POST,
  UNLIKE_POST,
} from "../utils/mutations";
import auth from "../utils/auth";
import styles from "../../styles/RecentPost.module.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const UserPosts = () => {
  const { id } = useParams();
  console.log("ID from useParams:", id);
  const userProfile = auth.getProfile();
  const loggedinuser = userProfile ? userProfile.data._id : null;

  const [likePostMutation] = useMutation(LIKE_POST);
  const [dislikePostMutation] = useMutation(DISLIKE_POST);
  const [unlikePostMutation] = useMutation(UNLIKE_POST);
  const [undislikePostMutation] = useMutation(UNDISLIKE_POST);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    refetchQueries: [ ADD_COMMENT, GET_USER_INFO ],
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: id || loggedinuser },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userPosts = data?.user.posts || [];

  const handleLikePost = async (postId) => {
    const post = userPosts.find((p) => p._id === postId);
    if (!post || !post.likes) {
      return;
    }
    const userHasLiked = post.likes.some((like) => like._id === loggedinuser);

    if (userHasLiked) {
      await unlikePostMutation({
        variables: { postId, userId: loggedinuser },
        refetchQueries: [
          { query: GET_USER_INFO, variables: { id: id || loggedinuser } },
        ],
      });
    } else {
      await likePostMutation({
        variables: { postId, userId: loggedinuser },
        refetchQueries: [
          { query: GET_USER_INFO, variables: { id: id || loggedinuser } },
        ],
      });
    }
  };
  const handleDislikePost = async (postId) => {
    const post = userPosts.find((p) => p._id === postId);
    if (!post || !post.dislikes) {
      return;
    }
    const userHasDisliked = post.dislikes.some(
      (dislike) => dislike._id === loggedinuser
    );

    if (userHasDisliked) {
      await undislikePostMutation({
        variables: { postId, userId: loggedinuser },
        refetchQueries: [
          { query: GET_USER_INFO, variables: { id: id || loggedinuser } },
        ],
      });
    } else {
      await dislikePostMutation({
        variables: { postId, userId: loggedinuser },
        refetchQueries: [
          { query: GET_USER_INFO, variables: { id: id || loggedinuser } },
        ],
      });
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
      console.log("Comment Content Length:", localCommentContent.length);

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

  return (
    <div>
      <h2 className={styles.postHeader}>User Posts</h2>
      {userPosts.map((post) => (
        <div className={styles.postContainer} key={post._id}>
          <div className={styles.userDetails}>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{data.user.username}</p>
              <p className={styles.postDate}>
                {new Date(parseInt(post.createdAt)).toLocaleString()}
              </p>
            </div>
          </div>
          <div className={styles.userPost}>
            <p className={styles.postContent}>{post.content}</p>
          </div>
          
          <button
            className={styles.commentButton}
            onClick={() => setShowModal(true)}
          >
            Add a Comment
          </button>
          
          <button
            className={styles.commentButtonGone}
            onClick={() => setShowModal(true)}
          >
            Add a Comment
          </button>
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
                <div className={styles.comment} key={comment._id}>
                  {comment.name && (
                    <p className={styles.commentName}>{comment.name}</p>
                  )}
                  <p className={styles.commentName}>{comment.user.username}</p>
                  {comment.content !== undefined &&
                    comment.content !== null && (
                      <p className={styles.commentBody}>{comment.content}</p>
                    )}
                </div>
              ))}
            </div>
            <div className={styles.likesDislikes}>
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
                  ({post.likes ? post.likes.length : 0})
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
                  ({post.dislikes ? post.dislikes.length : 0})
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
