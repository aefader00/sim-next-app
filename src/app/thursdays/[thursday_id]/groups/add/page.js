import GroupForm from "../components/groupform";

import { getAllUsers, getAllWorks, getAllSemesters, addGroup, getThursday } from "../../../../../actions";
import { redirect } from "next/navigation";

export default async function AddGroup({ params }) {
	const { thursday_id } = await params;
	const thursday = await getThursday(thursday_id);

	const users = await getAllUsers();
	users.map((user) => {
		user.key = user.id;
	});

	const works = await getAllWorks();
	works.map((work) => {
		work.key = work.id;
	});

	const semesters = await getAllSemesters();
	const thursdays = [];
	semesters.map((semester) => {
		thursdays.push({
			value: semester.id,
			label: semester.name,
			children: semester.thursdays.map((thursday) => ({ value: thursday.id, label: `${thursday.name} (${thursday.date.toLocaleDateString()})` })),
		});
	});

	return (
		<div>
			<h1>Add Group</h1>
			<GroupForm onSubmit={onSubmitAddGroup} thursday={thursday} users={users} works={works} thursdays={thursdays} />
		</div>
	);
}

async function onSubmitAddGroup(data) {
	"use server";
	addGroup(data);
	redirect(`/thursdays/${data.thursday}`);
}
