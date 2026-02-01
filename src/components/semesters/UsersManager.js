"use client";

import GoodButton from "../GoodButton";
import SearchFilter from "../searchfilter";
import ContentManager from "./ContentManager";
import ManageUsersTable from "./ManageUsersTable";

export default function UserManager({ query, users, button, semester }) {
	return (
		<ContentManager query={query} title={"Manage Users"} button={button}>
			<ManageUsersTable users={users} semester={semester} />
		</ContentManager>
	);
}
