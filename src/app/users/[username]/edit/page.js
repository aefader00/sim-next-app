import { notFound, redirect } from "next/navigation";

import UserForm from "../../../../components/users/UserForm";
import RemoveContentButton from "../../../../components/RemoveContentButton";

import { handleImageUpload, getUser, editUser, removeUser, getCurrentUser, isCurrentUserAdmin } from "../../../../actions";

export default async function EditUser({ params }) {
	const { username } = await params;
	const user = await getUser(username);
	if (!user) {
		notFound();
	}
	// Get the user data of the user you are signed in as.
	const currentUser = await getCurrentUser();
	if (!currentUser) return;
	return (
		<div>
			<h1>{user.name}</h1>
			<div>
				<h2>Edit User</h2>
				<UserForm onSubmit={onSubmitEditUser} user={user} isCurrentUserAdmin={await isCurrentUserAdmin()} />
			</div>
			<br />
			{currentUser.admin == true ? (
				<div>
					<h2>Remove User</h2>
					<p>This permanently removes the data of this user from the database altogether.</p>
					<p>
						If you want to unlist this user from a semester but keep their data in the database, go to the admin dashboard and edit the semester that you want
						to unlist this user from.
					</p>
					<RemoveContentButton onSubmit={onSubmitRemoveUser} data={user} />
				</div>
			) : null}
		</div>
	);
}

async function onSubmitEditUser(data) {
	"use server";

	let image_path = null;

	if (data.image && typeof data.image === "object") {
		image_path = await handleImageUpload(data.image, data.username, "faces");
		data.image = image_path;
	}

	await editUser(data);

	redirect(`/users/${data.username}`);
}

async function onSubmitRemoveUser(data) {
	"use server";
	removeUser(data);
	redirect("/");
}
