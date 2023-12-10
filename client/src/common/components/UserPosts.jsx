import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_USER_INFO } from '../utils/queries';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import styles from '../../styles/RecentPost.module.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { LIKE_POST, DISLIKE_POST } from '../utils/mutations';


const UserPosts = () => {
  const { id } = useParams();
  let userData = {};

  const [likePostMutation] = useMutation(LIKE_POST);
  const [dislikePostMutation] = useMutation(DISLIKE_POST);


  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);


  const handleLikePost = async (postId) => {
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

  const handleDislikePost = async (postId) => {
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


  if (!id) {
    const user = auth.getProfile().data._id;
    const { loading, error, data } = useQuery(GET_USER_INFO, { variables: { id: user } });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(userData.user.posts);
  } else {
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(userData.user.posts);
  }

  const userPosts = userData?.user.posts || [];

  return (
    <div>
      <h2>User Posts</h2>
      {userPosts.map((post) => (
        <div className={styles.postContainer} key={post._id}>
          <div className={styles.userDetails}>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userData.user.username}</p>
              <p className={styles.postDate}>{new Date(parseInt(post.createdAt)).toLocaleString()}</p>
            </div>
          </div>
          <div className={styles.userPost}>
            <p className={styles.postContent}>{post.content}</p>
          </div>
          {post.comments && post.comments.length > 0 && (
            <div className={styles.engagementSection}>
              <div className={styles.comments}>
                {post.comments.map((comment, index) => (
                  <p className={styles.comment} key={index}>
                    {comment.name && <div className={styles.commentName}>{comment.name}</div>}
                    {comment.content !== undefined && comment.content !== null && (
                      <div className={styles.commentBody}>{comment.content}</div>
                    )}
                  </p>
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
                      <FontAwesomeIcon icon={faThumbsUp} color="var(--black-haze)" />
                    </div>
                    ({likeCount})
                  </button>
                </div>
                <div className={styles.dislikeBox}>
                  <button
                    className={styles.dislikeButton}
                    onClick={() => handleDislikePost(post._id)}
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
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
