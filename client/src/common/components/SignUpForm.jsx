import { ADD_USER, GET_PRESIGNED_URL } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

function SignUpForm() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    username: "",
    bio: "",
    profileImage: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error: addUserError }] = useMutation(ADD_USER);
  const [getPresignedUrl, { error: presignedUrlError }] =
    useMutation(GET_PRESIGNED_URL);

  useEffect(() => {
    presignedUrlError ? setShowAlert(true) : setShowAlert(false);
  }, [presignedUrlError]);

  useEffect(() => {
    addUserError ? setShowAlert(true) : setShowAlert(false);
  }, [addUserError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    try {
      const presignedUrlResponse = await getPresignedUrl({
        variables: { key: `profile-images/${Date.now()}_example.jpg` },
      });
      const { presignedUrl, key } = presignedUrlResponse.data.getPresignedUrl;
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
      <form noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <div>
            Something went wrong with your sign up!
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
          <label htmlFor="username">Username</label>
          <input
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

        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
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
          <label htmlFor="profileImage">Profile Picture</label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            onInput={(e) =>
              setUserFormData({
                ...userFormData,
                profileImage: e.target.files[0],
              })
            }
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;
