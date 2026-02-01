// import styles
import styles from "../../components/semesters/semesters.module.css";
import Link from "next/link";
import { getFilteredUsers, getAllSemesters, getSemesterFromName, getFilteredThursdays } from "../../actions";

import SearchBar from "../../components/ui/SearchBar";

import SearchFilter from "../../components/ui/SearchFilter";

import AddContentButton from "../../components/AddContentButton";

import LinkButton from "../../components/linkbutton";

import UsersManager from "../../components/semesters/UsersManager";
import ThursdaysManager from "../../components/semesters/ThursdaysManager";
import GoodButton from "../../components/GoodButton";

import Button from "../../components/ui/Button";

export default async function Admin({ searchParams }) {
	const filters = await searchParams;

	const users = await getFilteredUsers(filters);
	const thursdays = await getFilteredThursdays(filters);

	const semesters = await getAllSemesters();

	const semester = await getSemesterFromName(filters.semester);

	return (
		<div>
			<SearchBar title="Manage Semester">
				<SearchFilter filter={"semester"} options={semesters} defaultValue={semesters[0]} />
				<Button href={`admin/semesters/${semester.id}/edit`}>Edit</Button>
				<Button href="admin/semesters/add">New Semester</Button>
			</SearchBar>
			<br />
			<UsersManager query={"user"} users={users} filters={filters} button={<Button href="/users/add">New User</Button>} semester={semester} />
			<br />
			<ThursdaysManager query={"thursdays"} thursdays={thursdays} filters={filters} />
			<br />
		</div>
	);
}
