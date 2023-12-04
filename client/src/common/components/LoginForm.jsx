import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    console.log("Form Submitted");
    try {
      const { data } = await loginUser({ variables: { ...userFormData } });
      console.log(data);
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
      <form noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <div>
            Something went wrong with your login credentials!
            <button
              type="button"
              className="close"
              onClick={() => setShowAlert(false)}
            >
              <span>&times;</span>
            </button>
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="*********"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Don't Have an Account?</h3>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
