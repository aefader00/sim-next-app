// File: components/thursdays/groups/works/WorkForm.js
"use client";

import { Input } from "antd";

import Button from "../../..//Button";

import { FormLabel, FormInput } from "../../../Form";
import UsersTransfer from "@/components/UsersTransfer";

export default function WorkForm({ onChange, onDelete, defaultValue, users }) {
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		onChange({ ...defaultValue, [name]: value });
	};

	const setSelectedPresentersKeys = (newKeys) => {
		onChange({ ...defaultValue, presenters: newKeys });
	};

	return (
		<div
			style={{
				border: "0.1rem solid black",
				padding: "1rem",
				margin: "1rem",
				borderRadius: "1rem",
				backgroundColor: "white",
			}}
		>
			<b>Presentation</b>
			<Button onClick={onDelete}>Trash</Button>
			<br />
			<FormLabel style={{ display: "block", padding: "0.5rem" }}>Name</FormLabel>
			<FormInput>
				<Input name="name" placeholder="Presentation Name" defaultValue={defaultValue.name} onChange={handleInputChange} />
			</FormInput>
			<FormLabel style={{ display: "block", padding: "0.5rem" }}>About</FormLabel>
			<FormInput>
				<Input name="about" placeholder="Presentation About" defaultValue={defaultValue.about} onChange={handleInputChange} />
			</FormInput>
			<FormLabel>Presenters</FormLabel>
			<FormInput>
				<UsersTransfer users={users} selectedUserKeys={defaultValue?.presenters || []} setSelectedUserKeys={setSelectedPresentersKeys} />
			</FormInput>
		</div>
	);
}
