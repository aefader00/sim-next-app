import styles from "./button.module.css";
import Link from "next/link";

export default function LinkButton({ value, href, style }) {
	return (
		<Link style={style} className={styles.button} href={href}>
			{value}
		</Link>
	);
}
