import styles from "../styles/UserDiamond.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default function UserDiamond() {
    return (
        <div className= { styles.diamondShape}>
                <FontAwesomeIcon icon={faUserSecret} className= { styles.userIcon } />
        </div>
     );
}