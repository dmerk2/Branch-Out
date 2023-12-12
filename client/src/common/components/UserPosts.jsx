
// import React, { useState } from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_USER_INFO } from "../utils/queries";
// import {
//   LIKE_POST,
//   DISLIKE_POST,
//   ADD_COMMENT,
//   UNDISLIKE_POST,
//   UNLIKE_POST,
// } from "../utils/mutations";
// import auth from "../utils/auth";
// import styles from "../../styles/RecentPost.module.css";
// import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// const UserPosts = () => {
//   const { id } = useParams();
//   const loggedinuser = auth.getProfile().data._id;
//   let userData = {};

//   const [likePostMutation] = useMutation(LIKE_POST);
//   const [dislikePostMutation] = useMutation(DISLIKE_POST);
//   const [unlikePostMutation] = useMutation(UNLIKE_POST);
//   const [undislikePostMutation] = useMutation(UNDISLIKE_POST);
//   const [addCommentMutation] = useMutation(ADD_COMMENT);

//   const [likeCount, setLikeCount] = useState(0);
//   const [dislikeCount, setDislikeCount] = useState(0);
//   const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null
//   const [isLiked, setIsLiked] = useState(false);
//   const [isDisliked, setIsDisliked] = useState(false);
//   const [commentContent, setCommentContent] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [addingComment, setAddingComment] = useState(false);

//   const handleLikePost = async (postId) => {
//     const post = data.posts.find((p) => p._id === postId);
//     const userHasLiked = post.likes.some((like) => like._id === loggedinuser);
//     console.log(post, "Current Post Being Liked");
//     console.log(loggedinuser, "Current User ID");

//     if (userHasLiked) {
//       await unlikePostMutation({
//         variables: { postId, userId: loggedinuser },
//         refetchQueries: [{ query: GET_ALL_POSTS }],
//       });
//     } else {
//       await likePostMutation({
//         variables: { postId, userId: loggedinuser },
//         refetchQueries: [{ query: GET_ALL_POSTS }],
//       });
//     }
//   };

//   const handleDislikePost = async (postId) => {
//     const post = data.posts.find((p) => p._id === postId);
//     const userHasDisliked = post.dislikes.some(
//       (dislike) => dislike._id === loggedinuser
//     );
//     console.log(post, "Current Post Being Disliked");

//     if (userHasDisliked) {
//       await undislikePostMutation({
//         variables: { postId, userId: loggedinuser },
//         refetchQueries: [{ query: GET_ALL_POSTS }],
//       });
//     } else {
//       await dislikePostMutation({
//         variables: { postId, userId: loggedinuser },
//         refetchQueries: [{ query: GET_ALL_POSTS }],
//       });
//     }
//   };

//   const handleAddComment = async (postId, content) => {
//     // Update the function parameters
//     try {
//       // Check if content is not empty
//       if (!content.trim()) {
//         console.error("Comment content cannot be empty");
//         return;
//       }

//       setAddingComment(true);

//       const { data } = await addCommentMutation({
//         variables: {
//           post: postId,
//           user: auth.getProfile().data._id,
//           content: content,
//         },
//       });

//       if (data.addComment) {
//         console.log("Comment added successfully:", data.addComment);
//         setAddingComment(false);
//         setCommentContent("");
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       setAddingComment(false);
//     }
//   };

//   const CommentModal = ({ onClose, onSubmit }) => {
//     const [localCommentContent, setLocalCommentContent] = useState("");

//     const handleCommentSubmit = () => {
//       console.log("Comment Content Length:", localCommentContent.length);

//       // Check if localCommentContent is not empty
//       if (!localCommentContent.trim()) {
//         console.error("Comment content cannot be empty");
//         return;
//       }

//       // Call onSubmit with postId and content
//       onSubmit(localCommentContent);
//       onClose();
//     };

//     return (
//       <div className={styles.modal}>
//         <div className={styles.modalHeader}>
//           <p className={styles.modalText}>Post Your Comment!</p>
//           <button className={styles.closeButton} onClick={() => onClose()}>
//             &times;
//           </button>
//         </div>
//         <textarea
//           className={styles.modalTextArea}
//           rows="4"
//           cols="50"
//           value={localCommentContent}
//           onChange={(e) => setLocalCommentContent(e.target.value)}
//         />
//         <br />
//         <div className={styles.modalButtons}>
//           <button
//             className={styles.commentButton}
//             onClick={handleCommentSubmit}
//           >
//             Submit Comment
//           </button>
//         </div>
//       </div>
//     );
//   };

//   if (!id) {
//     const user = auth.getProfile().data._id;
//     const { loading, error, data } = useQuery(GET_USER_INFO, {
//       variables: { id: user },
//     });
//     userData = data;

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
//   } else {
//     const { loading, error, data } = useQuery(GET_USER_INFO, {
//       variables: { id },
//     });
//     userData = data;

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
//   }

//   const userPosts = userData?.user.posts || [];

//   return (
//     <div>
//       <h2 className={styles.postHeader}>User Posts</h2>
//       {data.userPosts.map((post) => (
//         <div className={styles.postContainer} key={post._id}>
//           <div className={styles.userDetails}>
//             <div className={styles.userInfo}>
//               <p className={styles.userName}>{userData.username}</p>
//               <p className={styles.postDate}>
//                 {new Date(parseInt(post.createdAt)).toLocaleString()}
//               </p>
//             </div>
//           </div>
//           <div className={styles.userPost}>
//             <p className={styles.postContent}>{post.content}</p>
//           </div>
//           <button
//             className={styles.commentButton}
//             onClick={() => setShowModal(true)}
//           >
//             Add a Comment
//           </button>
//           {/* Modal */}
//           {showModal && (
//             <CommentModal
//               onClose={() => setShowModal(false)}
//               onSubmit={(content) => handleAddComment(post._id, content)}
//             />
//           )}
//           {post.comments && post.comments.length > 0 ? (
//             <div className={styles.engagementSection}>
//               <div className={styles.comments}>
//                 {post.comments.map((comment, index) => (
//                   <div className={styles.comment} key={index}>
//                     {comment.name && (
//                       <p className={styles.commentName}>{comment.name}</p>
//                     )}
//                     <p className={styles.commentName}>
//                       {comment.user.username}
//                     </p>
//                     {comment.content !== undefined &&
//                       comment.content !== null && (
//                         <p className={styles.commentBody}>{comment.content}</p>
//                       )}
//                   </div>
//                 ))}
//               </div>
//               <div className={styles.likesDislikes}>
//                 <div className={styles.likeBox}>
//                   <button
//                     className={styles.likeButton}
//                     onClick={() => handleLikePost(post._id)}
//                     disabled={isLiked}
//                   >
//                     <div className={styles.voteIcons}>
//                       <FontAwesomeIcon
//                         icon={faThumbsUp}
//                         color="var(--black-haze)"
//                       />
//                     </div>
//                     ({post.likes.length})
//                   </button>
//                 </div>
//                 <div className={styles.dislikeBox}>
//                   <button
//                     className={styles.dislikeButton}
//                     onClick={() => handleDislikePost(post._id)}
//                     disabled={isDisliked}
//                   >
//                     <div className={styles.voteIcons}>
//                       <FontAwesomeIcon
//                         icon={faThumbsDown}
//                         color="var(--black-haze)"
//                       />
//                     </div>
//                     ({post.dislikes.length})
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <p>No comments available.</p>
//               <div className={styles.likesDislikes}>
//                 <div className={styles.likeBox}>
//                   <button
//                     className={styles.likeButton}
//                     onClick={() => handleLikePost(post._id)}
//                     disabled={isLiked}
//                   >
//                     <div className={styles.voteIcons}>
//                       <FontAwesomeIcon
//                         icon={faThumbsUp}
//                         color="var(--black-haze)"
//                       />
//                     </div>
//                     ({post.likes.length})
//                   </button>
//                 </div>
//                 <div className={styles.dislikeBox}>
//                   <button
//                     className={styles.dislikeButton}
//                     onClick={() => handleDislikePost(post._id)}
//                     disabled={isDisliked}
//                   >
//                     <div className={styles.voteIcons}>
//                       <FontAwesomeIcon
//                         icon={faThumbsDown}
//                         color="var(--black-haze)"
//                       />
//                     </div>
//                     ({post.dislikes.length})
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserPosts;

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
  const loggedinuser = auth.getProfile().data._id;

  const [likePostMutation] = useMutation(LIKE_POST);
  const [dislikePostMutation] = useMutation(DISLIKE_POST);
  const [unlikePostMutation] = useMutation(UNLIKE_POST);
  const [undislikePostMutation] = useMutation(UNDISLIKE_POST);
  const [addCommentMutation] = useMutation(ADD_COMMENT);


  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addingComment, setAddingComment] = useState(false);

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: id || loggedinuser },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userPosts = data?.user.posts || [];

  const handleLikePost = async (postId) => {
    console.log(`handleLikePost called with postId: ${postId}`);
    const post = userPosts.find((p) => p._id === postId);
    console.log(`Found post: ${post}`);
    console.log(post, "Current Post Being Liked");
    const userHasLiked = post.likes.some((like) => like._id === loggedinuser);
    console.log(loggedinuser, "Current User ID");

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
    const userHasDisliked = post.dislikes.some(
      (dislike) => dislike._id === loggedinuser
    );
    console.log(post, "Current Post Being Disliked");

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
          {/* Modal */}
          {showModal && (
            <CommentModal
              onClose={() => setShowModal(false)}
              onSubmit={(content) => handleAddComment(post._id, content)}
            />
          )}
          {post.comments && post.comments.length > 0 ? (
            <div className={styles.engagementSection}>
              <div className={styles.comments}>
                {post.comments.map((comment, index) => (
                  <div className={styles.comment} key={index}>
                    {comment.name && (
                      <p className={styles.commentName}>{comment.name}</p>
                    )}
                    <p className={styles.commentName}>
                      {comment.user.username}
                    </p>
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
          ) : (
            <>
              <p>No comments available.</p>
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
