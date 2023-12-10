import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../utils/queries';
import auth from '../utils/auth';
import styles from '../../styles/RecentPost.module.css';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const { id } = useParams();
  let userData = {};

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
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
