"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Block from "./Block";
import styles from "./Block.module.css";

export default function Select({
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
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<Block as="select" defaultValue={defaultValue} className={styles.inputFace} onChange={(e) => handleOptions(e.target.value)}>
			{options.map((option) => (
				<option key={option.name} value={option.name}>
					{option.name}
				</option>
			))}
		</Block>
	);
}
