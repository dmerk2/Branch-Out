import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, GET_PRESIGNED_URL } from "../utils/mutations";
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

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Start upload

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

      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: formData,
        // onUploadProgress: implement if using XMLHttpRequest or Axios
      });

      if (uploadResponse.ok) {
        const imageUrl = `https://branch-out-images.s3.amazonaws.com/${key}`;
        const updatedFormData = { ...userFormData, profileImage: imageUrl };

        // Submit the user data
        const { data } = await addUser({ variables: { ...updatedFormData } });
        Auth.login(data.addUser.token);
      } else {
        throw new Error("Failed to upload image to S3");
      }
    } catch (error) {
      console.error("Error in form submission:", error.stack);
      console.log("Current userFormData state:", userFormData);
      // Specifically log the profileImage data
      console.log("Profile Image Data:", userFormData.profileImage);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
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

          <label htmlFor="profileImage"  className={styles.loginRequirement}>Profile Picture</label>
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

        <button type="submit" className={styles.signUpPageButton} disabled={isUploading}>
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
