import styles from "../../styles/AboutMe.module.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_INFO } from "../utils/queries";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AboutMe() {
  const { id } = useParams();
  const isLoggedIn = auth.loggedIn();
  const userId = isLoggedIn ? auth.getProfile().data._id : id;
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data;

  return (
    <div className={styles.bigGreenSquare}>
      <p className={styles.aboutMe}>About Me</p>
      <p className={styles.userDescription}>
        {userData && userData.user ? userData.user.bio : "Loading..."}
      </p>
      {isLoggedIn && location.pathname === "/profile" && (
        <button
          onClick={() => navigate(`${userData.user._id}/edit`)}
          className={styles.editButton}
        >
          Edit
        </button>
      )}
    </div>
  );
}
