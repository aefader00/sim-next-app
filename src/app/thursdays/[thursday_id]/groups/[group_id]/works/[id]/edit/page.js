import { notFound, redirect } from "next/navigation";

import WorkForm from "../../../../../../../../components/thursdays/groups/works/WorkForm";

import { getWork, getAllUsers, getAllGroups, getAllSemesters, editWork } from "../../../../../../../../actions";

export default async function EditWork({ params }) {
	const { id } = await params;

	const work = await getWork(id);

	if (!work) {
		notFound();
	}

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
			<h1>Edit Work</h1>
			<WorkForm onSubmit={onSubmitEditWork} work={work} semester_ids={semester_ids} users={users} groups={groups} />
		</div>
	);
}

async function onSubmitEditWork(data) {
	"use server";
	editWork(data);
	redirect(`/works/${data.id}`);
}
