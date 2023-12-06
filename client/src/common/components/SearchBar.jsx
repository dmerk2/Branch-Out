import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../utils/queries";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: { username: searchTerm },
    skip: !searchTerm,
  });

  const handleSearch = () => {
    // Perform the search using the searchTerm variable
    // You can use the searchTerm to filter the data as needed
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data && data.users ? data.users : [];

  // Filter users based on the current input value
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleUserClick = (userId) => {
    // Handle navigation to the user's profile, e.g., by using React Router
    console.log(`Navigate to user profile with id ${userId}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {filteredUsers.length > 0 && (
        <div className="dropdown">
          {filteredUsers.map((user) => (
            <div key={user._id} onClick={() => handleUserClick(user._id)}>
              <a href="#">{user.username}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
