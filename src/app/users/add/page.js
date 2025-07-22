import { redirect } from "next/navigation";

import UserForm from "@/components/users/UserForm";
import { addUser, isCurrentUserAdmin, handleImageUpload } from "../../../actions";

export default async function AddUser() {
	if (await isCurrentUserAdmin()) {
		return (
			<div>
				<h2>Add User</h2>
				<UserForm onSubmit={onSubmitAddUser} isCurrentUserAdmin={true} />
			</div>
		);
	} else {
		redirect("/users/");
	}
}

import path from "path";
import { copyFile } from "fs/promises";

export async function onSubmitAddUser(data) {
	"use server";
	const username = data.email.split("@")[0];
	data.username = username;

	if (data.image && typeof data.image === "object") {
		// User uploaded an image
		const imagePath = await handleImageUpload(data.image, username, "faces");
		data.image = imagePath;
	} else {
		// No image uploaded, copy default.jpg to faces/[username].jpg
		const ext = "jpg";
		const filename = `${username}.${ext}`;

		const src = path.join(process.cwd(), "public/faces/default.jpg");
		const dest = path.join(process.cwd(), "public/faces", filename);
		await copyFile(src, dest);

		data.image = `/faces/${filename}`;
	}

	await addUser(data);
	redirect(`/users/${username}`);
}
