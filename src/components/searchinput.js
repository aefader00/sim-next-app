"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder }) {
	const searchParams = useSearchParams();

	const pathname = usePathname();

	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<input
			placeholder={placeholder ? placeholder : "🔎"}
			onChange={(event) => {
				handleSearch(event.target.value);
			}}
			defaultValue={searchParams.get("search")?.toString()}
		/>
	);
}
