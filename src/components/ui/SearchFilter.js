"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Control from "./Control";
import styles from "./Control.module.css";

export default function SearchFilter({
	filter,
	options = [], // ✅ default value prevents crash
	defaultValue,
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleOptions = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set(filter, term);
		} else {
			params.delete(filter);
		}

		// if (term && term !== "All") {
		// 	params.set(filter, term);
		// } else {
		// 	params.delete(filter);
		// }

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<Control as="select" defaultValue={defaultValue} className={styles.inputFace} onChange={(e) => handleOptions(e.target.value)}>
			{options.map((option) => (
				<option key={option.name} value={option.name}>
					{option.name}
				</option>
			))}
			<option key="All" value="All">
				All
			</option>
		</Control>
	);
}
