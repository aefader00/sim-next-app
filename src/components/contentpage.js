import SearchBar from "./ui/SearchBar";
import SearchInput from "./ui/SearchInput";
import Button from "./ui/Button";

import NotFound from "./not-found";
import { getAllSemesters } from "../actions";
import SearchFilter from "./ui/SearchFilter";

export async function ContentPage({ button, query, header, children, filters }) {
	const semesters = await getAllSemesters();
	return (
		<div>
			<SearchBar title={header}>
				{button ? button : null}
				<SearchInput query={query} />
				<SearchFilter filter={"semester"} options={semesters} defaultValue={filters.semester} />
			</SearchBar>

			<div
				style={{
					margin: "1rem",
					padding: "1rem",
					backgroundColor: "rgba(211, 211, 211, 0.75)", // lightgrey with 0.8 opacity
					borderRadius: "0.33rem",
				}}
			>
				{children}
			</div>
		</div>
	);
}

export function ContentTable({ items, filters, category, children }) {
	if (items.length < 1) {
		return <NotFound category={category} query={filters.query} />;
	} else {
		return children;
	}
}
