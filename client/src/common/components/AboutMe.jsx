import styles from "../../styles/AboutMe.module.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_INFO } from "../utils/queries";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

export default function AboutMe() {
  // Get the user ID from the URL
  const { id } = useParams(); 
  let userData = {};

  if (!id) {
    const user = auth.getProfile().data._id;
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id: user },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  } else {
    const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { id },
    });
    userData = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  }

  return (
    <div className={styles.bigGreenSquare}>
      <p className={styles.aboutMe}>About Me</p>
      <p className={styles.userDescription}>{userData.user.bio}</p>
      <Link to={`${userData.user._id}/edit`}>
        <button className={styles.editButton}>Edit</button>
      </Link>
    </div>
  );
}
