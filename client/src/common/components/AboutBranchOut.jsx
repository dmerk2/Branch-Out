import styles from '../../styles/AboutBranchOut.module.css';

export default function AboutBranchOut() {
    return (
        <div className={styles.bigGreenSquare}>
            <p className={styles.aboutBranchOut}>About BranchOut</p>
            <p className={styles.branchOutDescription}> BranchOut is a social media platform that allows users to connect with other users and share their thoughts and ideas. </p>
        </div>
    );
}