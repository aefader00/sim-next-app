import styles from "./ManageContentTable.module.css";

export default function ManageContentTable({ head, body }) {
	return (
		<table className={styles.table}>
			<thead>{head}</thead>
			<tbody>{body}</tbody>
		</table>
	);
}
