"use client";

import { Input } from "antd";

import { useState } from "react";

import { ContentForm, FormLabel, FormInput } from "../ContentForm";

import ImageUpload from "@/components/ImageUpload";

export default function UserForm({ onSubmit, user, isCurrentUserAdmin = false }) {
	const [imageFile, setImageFile] = useState(null);
	return (
		<ContentForm
			action={(formData) => {
				const data = {
					name: formData.get("name"),
					image: imageFile || user?.image || null,
					email: formData.get("email"),
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
			<div>
				<FormLabel>{user ? "Edit Name" : "Add Name"}</FormLabel>
				<FormInput>
					<Input name="name" defaultValue={user?.name} required />
				</FormInput>
			</div>
			<div>
				<FormLabel>{user ? "Edit Photo" : "Add Photo"}</FormLabel>
				<FormInput>
					<ImageUpload onChange={(file) => setImageFile(file)} currentImagePath={user?.image || "/faces/default.jpg"} />
				</FormInput>
				{isCurrentUserAdmin ? null : (
					<p>
						<i>Contact SIM faculty to change your photo.</i>
					</p>
				)}
			</div>
			<div>
				<FormLabel>{user ? "Edit Email" : "Add Email"}</FormLabel>
				<FormInput>
					<Input name="email" defaultValue={user?.email} required disabled={isCurrentUserAdmin ? false : true} />
				</FormInput>
				{isCurrentUserAdmin ? null : (
					<p>
						<i>Contact SIM faculty to change your email.</i>
					</p>
				)}
			</div>
			<div>
				<FormLabel>{user ? "Edit About" : "Add About"}</FormLabel>
				<FormInput>
					<Input name="about" defaultValue={user?.about} />
				</FormInput>
			</div>
		</ContentForm>
	);
}
