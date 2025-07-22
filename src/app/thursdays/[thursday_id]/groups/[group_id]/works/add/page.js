import { redirect } from "next/navigation";

import WorkForm from "../../../../../../../components/thursdays/groups/works/WorkForm2";

import { getAllUsers, getAllGroups, getAllSemesters, addWork } from "../../../actions";

export default async function AddWork() {
	const users = await getAllUsers();
	users.map((user) => {
		user.key = user.id;
	});

	const groups = await getAllGroups();
	groups.map((group) => {
		group.key = group.id;
	});

	const semesters = await getAllSemesters();
	const semester_ids = [];
	semesters.map((semester) => {
		semester_ids.push({
			value: semester.id,
			label: semester.name,
		});
	});

	return (
		<div>
			<h1>Add Work</h1>
			<WorkForm onSubmit={onSubmitAddWork} semester_ids={semester_ids} users={users} groups={groups} />
		</div>
	);
}

async function onSubmitAddWork(data) {
	"use server";
	addWork(data);
	redirect("/works");
}
