import AddFriendSquare from "../common/components/AddFriendSquare"
import WhatsOnYourMind from "../common/components/WhatsOnYourMind"
import HomepageUserDiamond from "../common/components/HomepageUserDiamond"
import styles from "../styles/Homepage.module.css"
import SuggestedFriendsList from "../common/components/SuggestedFriends"
import AuthService from "../common/utils/auth"
import RecentPost from "../common/components/RecentPost"
import AboutBranchOut from "../common/components/AboutBranchOut"
import { useState } from "react"

export default function Home() {
  const isLoggedIn = AuthService.loggedIn();
  
    // State to hold the current postId when the user is logged in
    const [postId, setPostId] = useState('65712ad993e883778f15c49a');

    // Function to update the current postId
    const handlePostChange = (newPostId) => {
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
      </div>
      </div>
    </div>
  );
}
