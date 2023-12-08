import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../utils/queries";
import auth from "../utils/auth";
import styles from "../../styles/RecentPost.module.css";

const UserPosts = ({ userId }) => {
    const user = auth.getProfile().data._id;
  const { loading, error, data } = useQuery(GET_USER_INFO, {variables: {"id": user}});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  console.log(data, 'TEST HERE')

  const userPosts = data?.user.posts || [];


  
  return (
    <div>
      <h2>User Posts</h2>
      {userPosts.map((post) => (
        <div key={post._id}>
            <div>{data.user.username}</div>
          <p>{post.content}</p>
          {/* Display other post details here */}
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
