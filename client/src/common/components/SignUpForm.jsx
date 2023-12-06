import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_USER, GET_PRESIGNED_URL } from "../utils/mutations";
import { CHECK_USERNAME_EMAIL_EXISTS } from "../utils/queries";
import Auth from "../utils/auth";
import { BarLoader as Spinner } from "react-spinners";
import styles from "../../styles/LoginForm.module.css";
import Logo from "../../assets/images/BranchOut_With_Words.png";

function SignUpForm() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    username: "",
    bio: "",
    profileImage: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [color, setColor] = useState("#FF0000"); // Can be a CSS hex-color string or an array of colors in hex format
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [addUser, { error: addUserError }] = useMutation(ADD_USER);
  const [getPresignedUrl, { error: presignedUrlError }] =
    useMutation(GET_PRESIGNED_URL);
  const [checkUsernameEmailExists, { data, loading, error }] = useLazyQuery(
    CHECK_USERNAME_EMAIL_EXISTS
  );

  useEffect(() => {
    presignedUrlError ? setShowAlert(true) : setShowAlert(false);
  }, [presignedUrlError]);

  useEffect(() => {
    addUserError ? setShowAlert(true) : setShowAlert(false);
  }, [addUserError]);

  useEffect(() => {
    if (submitAttempted) {
      if (loading) return; // Waiting for the query to complete

      if (error) {
        console.error("Error checking username and email:", error);
        setShowAlert(true);
        setIsUploading(false);
        setSubmitAttempted(false);
        return;
      }

      if (data && data.users.length > 0) {
        const duplicateField = data.users.some(
          (user) => user.username === userFormData.username
        )
          ? "username"
          : "email";
        const message =
          duplicateField === "username"
            ? "This username is already taken. Please choose a different username."
            : "This email is already registered. Please use a different email.";
        alert(message);
        setIsUploading(false);
      } else {
        // Proceed with file upload and form submission
        // [place your file upload and form submission logic here]
      }
      setSubmitAttempted(false);
    }
  }, [
    submitAttempted,
    data,
    loading,
    error,
    userFormData.username,
    userFormData.email,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Indicate the start of the submission process

    // Trigger the lazy query to check if the username or email exists
    checkUsernameEmailExists({
      variables: {
        username: userFormData.username,
        email: userFormData.email,
      },
    });
    setSubmitAttempted(true); // Indicate that a submission attempt has been made

    try {
      const file = userFormData.profileImage;
      const key = `${Date.now()}_${file.name}`;
      const presignedUrlResponse = await getPresignedUrl({
        variables: { key: key },
      });
      const { presignedUrl } = presignedUrlResponse.data.getPresignedUrl;

      // Upload the file to S3
      const formData = new FormData();
      formData.append("file", file);

      // Create a new XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // Setup our listener to process completed requests
      xhr.onload = async function () {
        if (xhr.status == 200) {
          const imageUrl = `https://branch-out-images.s3.amazonaws.com/${key}`;
          const updatedFormData = { ...userFormData, profileImage: imageUrl };

          // Submit the user data
          const { data } = await addUser({ variables: { ...updatedFormData } });
          Auth.login(data.addUser.token);
        } else {
          throw new Error("Failed to upload image to S3");
        }
      };

      // Setup our listener to process upload progress
      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };

      // Open the connection
      xhr.open("PUT", presignedUrl, true);

      // Send the file
      xhr.send(formData);
    } catch (error) {
      console.error("Error signing up user:", error);
      setShowAlert(true);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };
  return (
    <>
      <form
        noValidate
        onSubmit={handleFormSubmit}
        className={styles.formSquare}
      >
        <div className={styles.formLogo}>
          <img src={Logo} alt="Branch Out Logo" />
        </div>

        <div>
          <label htmlFor="email" className={styles.loginRequirement}>
            Email
          </label>
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
          <label htmlFor="username" className={styles.loginRequirement}>
            Username
          </label>
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
          <label htmlFor="password" className={styles.loginRequirement}>
            Password
          </label>
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
          <label htmlFor="bio" className={styles.loginRequirement}>
            Bio
          </label>
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
          <label htmlFor="profileImage" className={styles.loginRequirement}>
            Profile Picture
          </label>
          <input
            className={styles.loginInput}
            type="file"
            name="profileImage"
            id="profileImage"
            onInput={(e) => {
              setUserFormData({
                ...userFormData,
                profileImage: e.target.files[0],
              });
            }}
          />
          {isUploading && (
            <div>
              <Spinner
                color={color}
                loading={isUploading}
                cssOverride={override}
                size={150}
                aria-label="Loading..."
                data-testid="spinner"
              />{" "}
              {/* Loading indicator */}
              <p>Uploading image... {uploadProgress}%</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={styles.signUpPageButton}
          disabled={isUploading}
        >
          Submit
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

export default SignUpForm;
