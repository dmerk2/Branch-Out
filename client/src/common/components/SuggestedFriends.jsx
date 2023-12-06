import styles from "../../styles/SuggestedFriends.module.css";
import AddFriendSquare from "./AddFriendSquare";

export default function SuggestedFriendsList() {
  return (
    <div>
      <div className={styles.suggestedFriendsInfo}>
        <div className={styles.suggestedFriends}>Suggested Friends</div>
      </div>
    </div>

  );
}