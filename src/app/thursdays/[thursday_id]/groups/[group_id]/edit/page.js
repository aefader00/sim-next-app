import { notFound, redirect } from "next/navigation";

import GroupForm from "../../components/groupform";

import { getGroup, getAllUsers, getAllWorks, getAllSemesters, editGroup } from "../../../../../../actions";

export default async function EditGroup({ params }) {
	const { group_id } = await params;

	const group = await getGroup(group_id);

	if (!group) {
		notFound();
	}

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
			<h1>Edit Group</h1>
			<GroupForm onSubmit={onSubmitEditGroup} group={group} thursday={group.thursday} users={users} works={works} thursdays={thursdays} />
		</div>
	);
}

async function onSubmitEditGroup(data) {
	"use server";
	editGroup(data);
	redirect(`/thursdays/${data.thursday}`);
}
