"use client";

import SearchInput from "./searchinput";
import SearchFilter from "./searchfilter";

import styles from "./search.module.css";

export default function SearchBar({ query, semesters }) {
	return (
		<div className={styles.SearchBar}>
			<SearchInput query={query} className={styles.SearchInput} />
			<SearchFilter className={styles.SearchFilter} filter={"semester"} options={semesters} defaultValue={semesters[0]} />
		</div>
	);
}
