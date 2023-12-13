import styles from "../../styles/UserDiamond.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default function UserDiamond({ profileImage }) {
    profileImage = profileImage || null;
    return (
        <div className={styles.diamondShape}>
            {profileImage ? (
                <img src={profileImage} alt="User" className={styles.userIcon} />
            ) : (
                <FontAwesomeIcon icon={faUserSecret} className={styles.userIcon} />
            )}
        </div>
    );
}