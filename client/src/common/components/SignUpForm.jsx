import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import styles from "../../styles/LoginForm.module.css";
import Logo from "../../assets/images/BranchOut_With_Words.png";

function LoginForm() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    username: "",
    bio: "",
    profileImage: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    error ? setShowAlert(true) : setShowAlert(false);
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }

    setUserFormData({
      email: "",
      password: "",
      username: "",
      bio: "",
      profileImage: "",
    });
  };

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit}  className={styles.formSquare}>

      <div className={styles.formLogo}>
            <img src={Logo} alt="Branch Out Logo" />
        </div>

        <div>
          <label htmlFor="email" className={styles.loginRequirement}>Email</label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Your email"
            name="email"
            id="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>
        
        <div>
          <label htmlFor="username" className={styles.loginRequirement}>Username</label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Your username"
            name="username"
            id="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className={styles.loginRequirement}>Password</label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="*********"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className={styles.loginRequirement}>Bio</label>
          <textarea
            className={styles.loginInput}
            name="bio"
            id="bio"
            cols="30"
            rows="4"
            onChange={handleInputChange}
            value={userFormData.bio}
            placeholder="Enter Your Bio"
          ></textarea>
        </div>

        <div>
          <label htmlFor="profileImage" className={styles.loginRequirement}>Profile Picture</label>
          <input type="file" name="profileImage" id="profileImage" className={styles.loginInput}/>
        </div>

        <button type="submit" className={styles.signUpPageButton}>
          Sign Up
        </button>
        
        {showAlert && (
          <div className={styles.somethingWrong}>
            Something went wrong with your sign up!
            <button
              type="button"
              className={styles.close}
              onClick={() => setShowAlert(false)}
            >
              <span>&times;</span>
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default LoginForm;
