import { notFound, redirect } from "next/navigation";

import UserForm from "../../components/userform";

import { getUser, editUser } from "../../../../actions";

export default async function EditWork({ params }) {
	const { id } = await params;

	const user = await getUser(id);

	if (!user) {
		notFound();
	}

	return (
		<div>
			<h1>Edit User</h1>
			<UserForm onSubmit={onSubmitEditUser} user={user} />
		</div>
	);
}

async function onSubmitEditUser(data) {
	"use server";
	editUser(data);
	redirect(`/users/${data.username}`);
}
