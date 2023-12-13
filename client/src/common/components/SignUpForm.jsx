import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormData,
  checkUsernameEmailExists,
  uploadFileAndRegisterUser,
  setUploadProgress,
  resetForm,
} from "../../features/signUpFormSlice";
import { BarLoader as Spinner } from "react-spinners";
import styles from "../../styles/LoginForm.module.css";
import Logo from "../../assets/images/BranchOut_With_Words.png";
import { v4 as uuidv4 } from "uuid";

function SignUpForm() {
  const dispatch = useDispatch();
  const {
    userFormData,
    isUploading,
    checkUsernameEmailError,
    userRegistrationError,
  } = useSelector((state) => state.signUpForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(false);

  // Handles changes in form inputs including file selection
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue =
      name === "profileImage" && files[0]
        ? { name: files[0].name, size: files[0].size, type: files[0].type }
        : value;
    dispatch(updateFormData({ field: name, value: newValue }));
    if (name === "profileImage") setSelectedFile(files[0] || null);
  };

  // Function to handle file upload
  const uploadFile = async () => {
    // Generate a unique hash
    const hash = uuidv4();

    // Get the file extension
    const extension = selectedFile.name.split(".").pop();

    // Define key using the unique hash and original file extension
    const key = `uploads/${hash}.${extension}`;
    try {
      const response = await fetch(
        `/presigned-url?key=${encodeURIComponent(key)}`
      );
      const data = await response.json();
      const presignedUrl = data.presignedUrl;

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", presignedUrl, true);
        xhr.upload.onprogress = (event) =>
          dispatch(setUploadProgress((event.loaded / event.total) * 100));
        xhr.onload = () =>
          xhr.status === 200
            ? resolve(`https://branch-out-images.s3.amazonaws.com/${key}`)
            : reject(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(selectedFile);
      });
    } catch (error) {
      console.error("Error getting presigned URL:", error);
      throw error;
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUploadError(false);

    try {
      // Check username/email existence
      await dispatch(
        checkUsernameEmailExists({
          username: userFormData.username,
          email: userFormData.email,
        })
      ).unwrap();
      let imageUrl = selectedFile
        ? await uploadFile()
        : "https://branch-out-images.s3.us-east-2.amazonaws.com/uploads/user-ninja-solid.svg";

      // Register the user and reset the form
      await dispatch(
        uploadFileAndRegisterUser({ userFormData, imageUrl })
      ).unwrap();
      dispatch(resetForm());
    } catch (error) {
      console.error("Error during form submission:", error);
      setUploadError(true);
    }
  };

  // JSX for rendering the form
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

        {/* Form Fields */}
        <div>
          {" "}
          {/* Email Field */}
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
          {" "}
          {/* Username Field */}
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
          {" "}
          {/* Password Field */}
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
          {" "}
          {/* Bio Field */}
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
          {" "}
          {/* Profile Image Field */}
          <label htmlFor="profileImage" className={styles.loginRequirement}>
            Profile Picture
          </label>
          <input
            className={styles.loginInput}
            type="file"
            name="profileImage"
            id="profileImage"
            onChange={handleInputChange}
          />
        </div>

        {/* Upload Progress and Error Display */}
        {isUploading && (
          <Spinner
            color="#someColor"
            loading={isUploading}
            size={150}
            aria-label="Loading..."
            data-testid="spinner"
          />
        )}
        {uploadError && (
          <div className={styles.somethingWrong}>
            Something went wrong with your sign up!
          </div>
        )}
        {checkUsernameEmailError && (
          <div className={styles.error}>{checkUsernameEmailError}</div>
        )}
        {userRegistrationError && (
          <div className={styles.error}>{userRegistrationError}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.signUpPageButton}
          disabled={isUploading}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
