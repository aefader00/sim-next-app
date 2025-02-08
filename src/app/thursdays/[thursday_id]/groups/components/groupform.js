"use client";

import { useState } from "react";

import { Cascader, Input, Select, Transfer } from "antd";

import { ContentForm, FormLabel, FormInput } from "../../../../../components/ContentForm";

export default function GroupForm({ onSubmit, group, thursday, users, works, thursdays }) {
	const [selectedLocation, setSelectedLocation] = useState(group?.location || "Pozen Center");
	const handleSelectedLocationChange = (event) => {
		setSelectedLocation(event);
	};
	const [selectedUsersKeys, setSelectedUsersKeys] = useState(group?.users.map(({ id }) => id) || []);
	const handleSelectedUsersKeysChange = (event) => {
		setSelectedUsersKeys(event);
	};
	const [selectedWorksKeys, setSelectedWorksKeys] = useState(group?.works.map(({ id }) => id) || []);
	const handleSelectedWorksKeysChange = (event) => {
		setSelectedWorksKeys(event);
	};
	const [selectedThursday, setSelectedThursday] = useState([thursday.semester_id, thursday.id]);
	const onThursdayChange = (event) => {
		setSelectedThursday(event);
	};

	return (
		<ContentForm
			action={(formData) => {
				const data = {
					name: formData.get("name"),
					location: selectedLocation,
					users: selectedUsersKeys,
					works: selectedWorksKeys,
					thursday: selectedThursday[1],
				};
				if (group) {
					data.id = group.id;
				}
				onSubmit(data);
			}}
			button={group ? "Edit Group" : "Add Group"}
		>
			<FormLabel>{group ? "Edit Name" : "Add Name"}</FormLabel>
			<FormInput>
				<Input name="name" defaultValue={group?.name} required />
			</FormInput>
			<FormLabel>{group ? "Edit Location" : "Add Location"}</FormLabel>
			<FormInput>
				<Select
					options={[
						{ value: "Pozen Center", label: "Pozen Center" },
						{ value: "Sound Studio", label: "Sound Studio" },
						{ value: "N181", label: "N181" },
						{ value: "D307", label: "D307" },
						{ value: "Godine Gallery", label: "Godine Gallery" },
					]}
					onChange={handleSelectedLocationChange}
					defaultValue={selectedLocation}
				/>
			</FormInput>
			<FormLabel>Select Thursday</FormLabel>
			<FormInput>
				<Cascader options={thursdays} onChange={onThursdayChange} defaultValue={selectedThursday} />
			</FormInput>
			<FormLabel>Select Users</FormLabel>
			<FormInput>
				<Transfer dataSource={users} targetKeys={selectedUsersKeys} onChange={handleSelectedUsersKeysChange} oneWay showSearch render={(item) => item.name} />
			</FormInput>
			<FormLabel>Select Works</FormLabel>
			<FormInput>
				<Transfer dataSource={works} targetKeys={selectedWorksKeys} onChange={handleSelectedWorksKeysChange} oneWay showSearch render={(item) => item.name} />
			</FormInput>
		</ContentForm>
	);
}
