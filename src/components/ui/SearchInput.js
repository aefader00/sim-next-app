"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import Control from "./Control";
import styles from "./Control.module.css";

export default function SearchInput({ query = "search", placeholder = "Search" }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	// Current param from URL
	const paramValue = searchParams.get(query) || "";

	// Local state for controlled input
	const [value, setValue] = useState(paramValue);

	// Keep local state in sync if URL changes from outside
	useEffect(() => {
		setValue(paramValue);
	}, [paramValue]);

	// Debounced navigation: only replace URL after user stops typing for 500ms
	const debouncedReplace = useDebouncedCallback((newValue) => {
		const params = new URLSearchParams(searchParams);

		if (newValue) params.set(query, newValue);
		else params.delete(query);

		replace(`${pathname}?${params.toString()}`);
	}, 500); // longer debounce = less stutter

	return (
		<Control
			as="input"
			type="text"
			value={value}
			placeholder={placeholder}
			className={styles.inputFace}
			onChange={(e) => {
				const newValue = e.target.value;
				setValue(newValue); // update input immediately
				debouncedReplace(newValue); // only update URL after debounce
			}}
		/>
	);
}
