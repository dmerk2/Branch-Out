import AddFriendSquare from "../common/components/AddFriendSquare"
import WhatsOnYourMind from "../common/components/WhatsOnYourMind"
import HomepageUserDiamond from "../common/components/HomepageUserDiamond"
import styles from "../styles/Homepage.module.css"
import SuggestedFriendsList from "../common/components/SuggestedFriends"
import AuthService from "../common/utils/auth"
import RecentPost from "../common/components/RecentPost"
import AboutBranchOut from "../common/components/AboutBranchOut"

export default function Home() {
  const isLoggedIn = AuthService.loggedIn();
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
              {<WhatsOnYourMind />}
              {<RecentPost />}
            </div>
          ) : (
            <div>
              {<RecentPost />}
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
      </div>

    </div>
  );
}
