import styles from "../../styles/AboutBranchOut.module.css";

export default function AboutBranchOut() {
  return (
    <div className={styles.bigGreenSquare}>
      <p className={styles.aboutBranchOut}>About Branch Out</p>
      <p className={styles.branchOutDescription}>
        Branch Out is a social media platform for web developers wanting to
        “branch out” from the monotony of daily work life, and to connect with
        like minded peers.
      </p>
    </div>
  );
}
