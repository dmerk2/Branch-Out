import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_INFO } from "../utils/queries";
import styles from "../../styles/ViewFriendsList.module.css";
import AddFriendSquare from "./AddFriendSquare";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

const ViewFriendsList = () => {
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
      <div className={styles.profileFriendsInfo}>
        <p className={styles.profileFriendCount}>Friends: {friends.length}</p>
        <Link to="/friends">
        <button className={styles.profileViewAllFriends}>View All</button>
       </Link>
        </div>
      <div className={styles.justTheFriends}>
        {friends.map((friend) => (
          <AddFriendSquare key={friend._id} friend={friend} />
        ))}
      </div>
    </div>
   
  );
};

export default ViewFriendsList;
