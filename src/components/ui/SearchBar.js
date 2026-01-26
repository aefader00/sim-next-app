import styles from "./SearchBar.module.css";

export default function SearchBar({ title, children }) {
	return (
		<div className={styles.header}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.controls}>{children}</div>
		</div>
	);
}
