import styles from "./button.module.css";

export default function Button({ type = "button", value, onClick }) {
	return <input type={type} className={styles.button} value={value} onClick={onClick} />;
}
