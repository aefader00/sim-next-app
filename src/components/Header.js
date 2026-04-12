import styles from "./Header.module.css";

export default function Header({ label, children }) {
	return (
		<div className={styles.Wrapper}>
			<div className={styles.Label}>{label}</div>
			<div className={styles.Children}>{children}</div>
		</div>
	);
}
