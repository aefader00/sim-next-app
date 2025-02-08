import SearchBar from "./searchbar";

import NotFound from "./not-found";
import { getAllSemesters } from "../actions";

export async function ContentPage({ header, children }) {
	const semesters = await getAllSemesters();
	return (
		<div>
			<h1>{header} </h1>

			<SearchBar semesters={semesters} />

			<div
				style={{
					margin: "1rem",
					padding: "1rem",
					backgroundColor: "lightgrey",
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
