import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, GET_PRESIGNED_URL } from "../utils/mutations";
import Auth from "../utils/auth";
import { BarLoader as Spinner } from "react-spinners";

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
        setUserFormData({ ...userFormData, profileImage: imageUrl });

        // Submit the user data
        const { data } = await addUser({ variables: { ...userFormData } });
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

        <button type="submit" disabled={isUploading}>
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
