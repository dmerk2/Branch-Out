import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_INFO } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import auth from "../utils/auth";
import styles from "../../styles/RecentPost.module.css";
import { useParams } from "react-router-dom";

const UserPosts = () => {
  let data;
  const { id } = useParams();
  const isLoggedIn = auth.loggedIn();
  const [showModal, setShowModal] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    refetchQueries: [ADD_COMMENT, GET_USER_INFO],
  });

  if (!id) {
    const user = auth.getProfile().data._id;
    const result = useQuery(GET_USER_INFO, {
      variables: { id: user },
    });
    data = result.data;

    if (result.loading) return <p>Loading...</p>;
    if (result.error) return <p>Error: {result.error.message}</p>;
  } else {
    const result = useQuery(GET_USER_INFO, {
      variables: { id },
    });
    data = result.data;

    if (result.loading) return <p>Loading...</p>;
    if (result.error) return <p>Error: {result.error.message}</p>;
  }

  const userPosts = data?.user.posts || [];

  const handleAddComment = async (postId, content) => {
    try {
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
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setAddingComment(false);
    }
  };

  const CommentModal = ({ onClose, onSubmit }) => {
    const [localCommentContent, setLocalCommentContent] = useState("");

    const handleCommentSubmit = () => {
      if (!localCommentContent.trim()) {
        console.error("Comment content cannot be empty");
        return;
      }

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
            <button className={styles.commentButton} disabled>
              Add a Comment
            </button>
          )}
          {showModal && (
            <CommentModal
              onClose={() => setShowModal(false)}
              onSubmit={(content) => handleAddComment(activePostId, content)}
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
