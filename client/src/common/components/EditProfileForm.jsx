import { useState, useEffect } from "react";
import { GET_USER_INFO } from "../utils/queries";
import auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const user = auth.getProfile().data._id;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log("User:", user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser({
        variables: {
          _id: user,
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Bio:
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
      </label>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfileForm;
