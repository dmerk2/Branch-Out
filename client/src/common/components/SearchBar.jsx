import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../utils/queries";
import styles from "../../styles/SearchBar.module.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: { username: searchTerm },
    skip: !searchTerm,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data && data.users ? data.users : [];

  // Filter users based on the current input value
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.headerSearch}>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.length > 0 && (
        <div className={styles.dropdown}>
          {filteredUsers.map((user) => (
            <div key={user._id} onClick={() => handleUserClick(user._id)}>
              <a href={`/profile/${user._id}`}>{user.username}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
