import styles from "../styles/Profile.module.css";
import { faCodeCompare, faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import ProfileUserDisplay from "../common/components/ProfileUserDisplay.jsx";
import ViewFriendsList from "../common/components/ViewFriendsList.jsx";
import AboutMe from "../common/components/AboutMe.jsx";
import DiamondButton from "../common/components/DiamondButton.jsx";
import WhatsOnYourMind from "../common/components/WhatsOnYourMind.jsx";
import UnreadMessageBoard from "../common/components/UnreadMessageBoard.jsx";
import UserPosts from "../common/components/UserPosts.jsx";

export default function Profile() {
  const buttons = [
    { icon: faCodeCompare, url: 'https://github.com/' },
    { icon: faLink, url: 'https://www.linkedin.com/' },
    { icon: faCode, url: 'https://codepen.io/' },
    // Add more objects as needed
  ];

  return (
    <div className={styles.profilePageRow}>
      <div className={styles.profilePageColumn}>
        <div className={styles.profileUserSection}>
          <ProfileUserDisplay />
        </div>
        <div className={styles.profileFriendsTracker}>
          <ViewFriendsList />
        </div>
      </div>
      <div className={styles.profilePageColumn}>
        <AboutMe />
        <div className={styles.profileButtonRow}>
          {buttons.map((button, index) => (
            <div className={styles.profileButton} key={index}>
              <DiamondButton icon={button.icon} url={button.url} />
            </div>
          ))}
        </div>
        <WhatsOnYourMind />
        <UserPosts />
      </div>
      <div className={styles.profilePageColumn}>
        <UnreadMessageBoard />
      </div>
    </div>
  );
}