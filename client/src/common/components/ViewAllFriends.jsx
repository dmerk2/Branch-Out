import AddFriendSquare from "./AddFriendSquare";
import { useParams } from "react-router-dom";
import auth from "../utils/auth";
import { GET_USER_INFO } from "../utils/queries";
import { useQuery } from "@apollo/client";

const AllFriendsList = () => {
  // Get the user ID from the URL
  const { id } = useParams();
  let userData = {};

  if (!id) {
    const user = auth.getProfile().data._id;
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id: user },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(userData.user.friends);
  } else {
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      // Pass the user ID to the query
      variables: { id },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(userData.user.friends);
  }

  const friends = userData?.user.friends || [];

  return (
    <div>
      <h2>All Friends</h2>
      {friends.map((friend) => (
        <AddFriendSquare key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default AllFriendsList;
