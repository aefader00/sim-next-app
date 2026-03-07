"use client";

import SearchInput from "../ui/SearchInput";
import styles from "./ContentManager.module.css";
import SearchBar from "../ui/SearchBar";

export default function ContentManager({ button, title, query, children }) {
	return (
		<div className={styles.card}>
			<SearchBar title={title}>
				<SearchInput query={query} />

				{button}
			</SearchBar>

			{children}
		</div>
	);
}
