import styles from "../../styles/AboutMe.module.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_INFO } from "../utils/queries";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';




export default function AboutMe() {
  // Get the user ID from the URL
  const { id } = useParams();
  let userData = {};
  const navigate = useNavigate();
  const currentUser = auth.getProfile().data._id;
  const location = useLocation();

  if (!id) {
    const user = auth.getProfile().data._id;
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id: user },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div className={styles.bigGreenSquare}>
        <p className={styles.aboutMe}>About Me</p>
        <p className={styles.userDescription}>{userData.user.bio}</p>
        {location.pathname === '/profile' && (
          <button
            onClick={() => navigate(`${userData.user._id}/edit`)}
            className={styles.editButton}
          >
            Edit
          </button>
        )}
      </div>
    );
  } else {
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div className={styles.bigGreenSquare}>
        <p className={styles.aboutMe}>About Me</p>
        <p className={styles.userDescription}>{userData.user.bio}</p>
        {currentUser === id && location.pathname === '/profile' && (
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
}