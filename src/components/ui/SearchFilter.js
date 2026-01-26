"use client";

import SelectInput from "./SelectInput";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchFilter({ filter, options, defaultValue, className }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	// Debounced URL update
	const handleOptions = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);

		if (term && term !== "All") {
			params.set(filter, term);
		} else {
			params.delete(filter);
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<SelectInput className={className} defaultValue={defaultValue} onChange={(e) => handleOptions(e.target.value)}>
			{options.map((option) => (
				<option key={option.name} value={option.name}>
					{option.name}
				</option>
			))}
			<option value="All">All</option>
		</SelectInput>
	);
}
