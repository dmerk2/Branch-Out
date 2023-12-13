import { useParams } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import {
  faCodeCompare,
  faLink,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import ProfileUserDisplay from "../common/components/ProfileUserDisplay.jsx";
import ViewFriendsList from "../common/components/ViewFriendsList.jsx";
import AboutMe from "../common/components/AboutMe.jsx";
import DiamondButton from "../common/components/DiamondButton.jsx";
import SendMessageButton from "../common/components/SendMessage";
import UserPosts from "../common/components/UserPosts.jsx";
import AddFriendButtonWithQuery from "../common/components/AddFriendButtonProfiles.jsx";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../common/utils/queries";

export default function OtherUserProfile() {
  const { id } = useParams();
  const buttons = [
    { icon: faCodeCompare, url: "https://github.com/" },
    { icon: faLink, url: "https://www.linkedin.com/" },
    { icon: faCode, url: "https://codepen.io/" },
  ];
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className={styles.profilePageRow}>
        <div className={styles.profilePageColumn}>
          <div className={styles.profileUserSection}>
            <ProfileUserDisplay userInfo={data.user} />
          </div>
          <div>
            <AddFriendButtonWithQuery userId={id} />
          </div>
          <div className={styles.profileFriendsTracker}>
            <ViewFriendsList />
          </div>
        </div>
        <div className={styles.profilePageColumn}>
          <AboutMe userInfo={data.user} />
          <div className={styles.profileButtonRow}>
            {buttons.map((button, index) => (
              <div className={styles.profileButton} key={index}>
                <DiamondButton icon={button.icon} url={button.url} />
              </div>
            ))}
          </div>
          <div>
            <UserPosts userId={id} />
          </div>
        </div>
        <div className={styles.profilePageColumn}>
          <SendMessageButton userId={id} />
        </div>
      </div>
    </div>
  );
}
