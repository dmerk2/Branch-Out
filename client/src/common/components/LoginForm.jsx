import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/LoginForm.module.css";
import Logo from "../../assets/images/BranchOut_With_Words.png";

function LoginForm() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    bio: "",
    profileImage: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    error ? setShowAlert(true) : setShowAlert(false);
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { ...userFormData } });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }

    setUserFormData({
      email: "",
      password: "",
      bio: "",
      profileImage: "",
    });
  };

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit} className={styles.formSquare}>
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

        <button type="submit" className={styles.loginButton}>LOGIN</button>
        {showAlert && (
          <div className={styles.somethingWrong}>
            Something went wrong with your login credentials!
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
      <div className={styles.noAccount}>
        <h3 className={styles.signUp}>Don't Have an Account?</h3>
        <Link to="/signup" className={styles.linkUnderline}>
          <button className={styles.signUpButton}>Sign Up</button>
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
