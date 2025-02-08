"use client";

import { Input } from "antd";

import { ContentForm, FormLabel, FormInput } from "../../../components/ContentForm";

export default function UserForm({ onSubmit, user }) {
	return (
		<ContentForm
			action={(formData) => {
				const data = {
					name: formData.get("name"),
					about: formData.get("about"),
				};
				if (user) {
					data.id = user.id;
					data.username = user.username;
				}
				onSubmit(data);
			}}
			button={user ? "Edit User" : "Add User"}
		>
			<FormLabel>{user ? "Edit Name" : "Add Name"}</FormLabel>
			<FormInput>
				<Input name="name" defaultValue={user?.name} required />
			</FormInput>
			<FormLabel>{user ? "Edit About" : "Add About"}</FormLabel>
			<FormInput>
				<Input name="about" defaultValue={user?.about} required />
			</FormInput>
		</ContentForm>
	);
}
