"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import base from "./Control.module.css";
import styles from "./SearchInput.module.css";
import clsx from "clsx";

export default function SearchInput({ query = "search", placeholder = "🔎" }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const paramValue = searchParams.get(query) || "";
	const [value, setValue] = useState(paramValue);

	useEffect(() => {
		setValue(paramValue);
	}, [paramValue]);

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);
		if (term) params.set(query, term);
		else params.delete(query);

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className={base.controlContainer + " " + styles.search}>
			<div className={base.buttonBase}></div>
			<input
				className={clsx(base.control)}
				value={value}
				placeholder={placeholder}
				onChange={(e) => {
					setValue(e.target.value);
					handleSearch(e.target.value);
				}}
			/>
		</div>
	);
}
