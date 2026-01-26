"use client";

import ContentManager from "./ContentManager";
import ManageThursdaysTable from "./ManageThursdaysTable";

export default function ThursdaysManager({ query, thursdays, button }) {
	return (
		<ContentManager query={query} title={"Manage Thursdays"} button={button}>
			<ManageThursdaysTable thursdays={thursdays} />
		</ContentManager>
	);
}
