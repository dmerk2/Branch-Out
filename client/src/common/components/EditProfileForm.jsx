import { useState, useEffect } from "react";
import { GET_USER_INFO } from "../utils/queries";
import auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import styles from "../../styles/LoginForm.module.css";
import Logo from "../../assets/images/BranchOut_With_Words.png";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      UPDATE_USER,
      GET_USER_INFO
    ]
  });
  const user = auth.getProfile().data._id;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log("User:", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser({
        variables: {
          id: user,
          username: formData.name,
          email: formData.email,
          bio: formData.bio,
        },
      });
      console.log("Profile updated successfully", result);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id: user },
  });

  useEffect(() => {
    if (data && data.user) {
      setFormData({
        name: data.user.username || "",
        email: data.user.email || "",
        bio: data.user.bio || "",
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <form onSubmit={handleSubmit} className={styles.formSquare}>
      <div className={styles.formLogo}>
        <img src={Logo} alt="Branch Out Logo" />
      </div>

      <div>
        <label className={styles.loginRequirement}>Name:</label>
        <input
          className={styles.loginInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className={styles.loginRequirement}>Email:</label>
        <input
          className={styles.loginInput}
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className={styles.loginRequirement}>Bio:</label>
        <textarea
          className={styles.loginInput}
          name="bio"
          cols="30"
          rows="20"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className={styles.signUpPageButton}>
        Update Profile
      </button>
    </form>
  );
};

export default EditProfileForm;
