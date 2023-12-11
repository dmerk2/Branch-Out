import styles from "../../styles/SuggestedFriends.module.css";
import AddFriendSquare from "./AddFriendSquare";
import { SEARCH_USERS } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function SuggestedFriendsList() {
  const { loading, error, data } = useQuery(SEARCH_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const friends = data.users; // Update to use friends instead of users

  return (
    <div>
      <div className={styles.suggestedFriendsInfo}>
        <div className={styles.suggestedFriends}>Suggested Friends
        <div>
          {friends.map((friend) => (
            <AddFriendSquare key={friend._id} friend={friend} /> // Pass friend prop
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}