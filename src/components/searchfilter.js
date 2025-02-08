"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export default function SearchFilter({ filter, options, defaultValue }) {
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
		<select
			name={filter}
			id={filter}
			onChange={(event) => {
				handleOptions(event.target.value);
			}}
			defaultValue={defaultValue}
		>
			{options.map((option) => {
				return <option key={option.name} value={option.name}>{`${option.name}`}</option>;
			})}
			<option value={"All"}>All</option>
		</select>
	);
}
