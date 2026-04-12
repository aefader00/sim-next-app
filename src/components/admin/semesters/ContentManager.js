"use client";

import Input from "../../Input";
import styles from "./ContentManager.module.css";
import Header from "../../Header";

export default function ContentManager({ button, label, query, children }) {
	return (
		<div className={styles.card}>
			<Header label={<h3>{label}</h3>}>
				<Input query={query} />

				{button}
			</Header>

			{children}
		</div>
	);
}
