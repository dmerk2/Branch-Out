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

function SignUpForm() {
  const dispatch = useDispatch();
  const {
    userFormData,
    isUploading,
    showAlert,
    uploadProgress,
    checkUsernameEmailLoading,
    checkUsernameEmailError,
    userRegistrationError,
  } = useSelector((state) => state.signUpForm);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file); // Store the actual file object
        dispatch(
          updateFormData({
            field: e.target.name,
            value: { name: file.name, size: file.size, type: file.type },
          })
        );
      } else {
        setSelectedFile(null); // No file selected
        dispatch(
          updateFormData({
            field: e.target.name,
            value: defaultProfileImage, // Set to default image
          })
        );
      }
    } else {
      dispatch(updateFormData({ field: e.target.name, value: e.target.value }));
    }
  };

  const uploadFile = async () => {
    const key = `uploads/${selectedFile.name}`;
    // Generate a unique key for the file
    try {
      const response = await fetch(
        `/presigned-url?key=${encodeURIComponent(key)}`
      );
      const data = await response.json();
      const presignedUrl = data.presignedUrl;

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", presignedUrl, true);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            dispatch(setUploadProgress(progress));
          }
        };

        xhr.onload = () =>
          xhr.status === 200
            ? resolve(`https://branch-out-images.s3.amazonaws.com/${key}`)
            : reject(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send(selectedFile); // Send the actual file
      });
    } catch (error) {
      console.error("Error getting presigned URL:", error);
      throw error;
    }
  };

  const [uploadError, setUploadError] = useState(false);

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

      let imageUrl =
        "https://branch-out-images.s3.us-east-2.amazonaws.com/uploads/user-ninja-solid.svg";
      if (selectedFile) {
        try {
          const uploadedImageUrl = await uploadFile();
          if (uploadedImageUrl) {
            imageUrl = uploadedImageUrl;
          }
        } catch (uploadError) {
          console.error("Error during file upload:", uploadError);
          setUploadError(true);
          return; // Exit if there is an upload error
        }
      }

      // Register the user
      await dispatch(
        uploadFileAndRegisterUser({ userFormData, imageUrl })
      ).unwrap();
      dispatch(resetForm()); // Reset the form on successful registration
    } catch (error) {
      // Catch any errors from username/email check or registration
      console.error("Error during form submission:", error);
      setUploadError(true);
    }
  };

  // JSX for the form
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
            value={userFormData.email} // Value obtained from Redux state
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
            value={userFormData.username} // Value obtained from Redux state
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
            value={userFormData.password} // Value obtained from Redux state
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
            value={userFormData.bio} // Value obtained from Redux state
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
            onChange={handleInputChange} // Handle file input changes
          />
        </div>

        {isUploading && (
          <div>
            <Spinner
              color="#someColor" // Replace with actual color value
              loading={isUploading}
              size={150}
              aria-label="Loading..."
              data-testid="spinner"
            />
            <p>Uploading image... {uploadProgress}%</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className={styles.signUpPageButton}
          disabled={isUploading}
        >
          Submit
        </button>

        {/* Error alert */}
        {uploadError && (
          <div className={styles.somethingWrong}>
            Something went wrong with your sign up!
          </div>
        )}
        {/* Display username/email existence error */}
        {checkUsernameEmailError && (
          <div className={styles.error}>{checkUsernameEmailError}</div>
        )}

        {/* Display user registration error */}
        {userRegistrationError && (
          <div className={styles.error}>{userRegistrationError}</div>
        )}

        {/* Display loading spinner */}
        {checkUsernameEmailLoading && (
          <Spinner
            color="#00FF00" // Replace with actual color value
            loading={checkUsernameEmailLoading}
            size={150}
            aria-label="Loading..."
            data-testid="spinner"
          />
        )}
      </form>
    </>
  );
}

export default SignUpForm;
