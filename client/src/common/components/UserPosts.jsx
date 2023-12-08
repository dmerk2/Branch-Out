import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../utils/queries";

const UserPosts = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { userId },
  });

  console.log("UserPosts Component - userId:", userId);
  console.log("UserPosts Component - data:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userPosts = data?.user?.posts || [];

  return (
    <div>
      <h2>User Posts</h2>
      {userPosts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          {/* Display other post details here */}
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
