import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import Logo from "../assets/images/BranchOut_With_Words.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.headerLogo}>
        <img src={Logo} alt="Branch Out Logo" />
        Branch Out
      </Link>
      <div className={styles.headerSearch}>
        <input type="search" placeholder="Search..." />
      </div>
      <div className={styles.headerNav}>
        <ul className={styles.navbarNav}>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/chatroom">
              Live Chat
            </Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
