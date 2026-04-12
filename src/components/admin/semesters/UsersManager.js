"use client";

import ContentManager from "./ContentManager";
import ManageUsersTable from "./ManageUsersTable";

export default function UserManager({ query, users, button, semester }) {
	return (
		<ContentManager query={query} label={"Manage Users"} button={button}>
			<ManageUsersTable users={users} semester={semester} />
		</ContentManager>
	);
}
