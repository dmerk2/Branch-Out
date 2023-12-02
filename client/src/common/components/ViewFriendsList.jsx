import styles from "../../styles/ViewFriendsList.module.css";

export default function ViewFriendsList() {
  return (
    <div className={styles.profileFriendsInfo}>
    <p className={styles.profileFriendCount}>Friends: 21</p>
    <button className={styles.profileViewAllFriends}>View All</button>
  </div>
  )
}