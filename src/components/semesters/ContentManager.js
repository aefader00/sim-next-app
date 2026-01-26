"use client";

import GoodButton from "../GoodButton";
import SearchInput from "../ui/SearchInput";
import styles from "./ContentManager.module.css";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";

export default function ContentManager({ button, title, query, children }) {
	return (
		<div className={styles.card}>
			<SearchBar title={title}>
				<SearchInput query={query} />

				<Button>{button}</Button>
			</SearchBar>

			{children}
		</div>
	);
}
