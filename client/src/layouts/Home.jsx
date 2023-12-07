import AddFriendSquare from "../common/components/AddFriendSquare"
import WhatsOnYourMind from "../common/components/WhatsOnYourMind"
import HomepageUserDiamond from "../common/components/HomepageUserDiamond"
import styles from "../styles/Homepage.module.css"
import SuggestedFriendsList from "../common/components/SuggestedFriends"
import AuthService from "../common/utils/auth"
import RecentPost from "../common/components/RecentPost"
import AboutBranchOut from "../common/components/AboutBranchOut"
import SendMessageButton from "../common/components/SendMessage"
import { useState } from "react"

export default function Home() {
  const isLoggedIn = AuthService.loggedIn();
  
    // State to hold the current postId when the user is logged in
    const [postId, setPostId] = useState('657122e9905ff73c832c1a5d');

    // Function to update the current postId
    const handlePostChange = (newPostId) => {
      console.log('New postId:', newPostId);
      setPostId(newPostId);
    };

  return (
    <div className={styles.homepageRow}>
      <div className={styles.homepageColumn}>
        <div className={styles.HomepageUserDiamond}>
          <HomepageUserDiamond />
        </div>
      </div>
      <div className={styles.homepageColumn}>
        <div><AboutBranchOut />
          {isLoggedIn ? (
            <div>
              <WhatsOnYourMind onPostChange={handlePostChange} />
              <RecentPost postId={postId} />
            </div>
          ) : (
            <div>
              <RecentPost postId={postId}/>
            </div>
          )}
        </div>
      </div>

      <div className={styles.homepageColumn}>
        <div>
          <SuggestedFriendsList />
        </div>
        <div className={styles.homepageAddFriends}>
          <AddFriendSquare />
          <AddFriendSquare />
        </div>
        <div>
        <SendMessageButton />
      </div>
      </div>
    </div>
  );
}
