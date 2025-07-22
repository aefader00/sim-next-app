"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Cascader, Input } from "antd";

import { ContentForm, FormLabel, FormInput } from "../../ContentForm";
import PresentationsField from "./PresentationsField";
import LocationSelect from "./LocationSelect";
import UsersTransfer from "../../UsersTransfer";

export default function GroupForm({ onSubmit, group, thursday, users, thursdays }) {
	const [selectedLocation, setSelectedLocation] = useState(group?.location || "Pozen Center");
	const [selectedProducersKeys, setSelectedProducersKeys] = useState(group?.producers.map(({ id }) => id) || []);
	const [selectedThursday, setSelectedThursday] = useState([thursday.semester_id, thursday.id]);

	const defaultPresentations = group?.presentations.map((presentation) => ({
		name: presentation.name,
		about: presentation.about,
		presenters: presentation.presenters?.map((user) => user.id) || [], // works for edit
		id: presentation.id,
		index: uuidv4(),
	})) || [
		{ name: "", about: "", presenters: [], index: uuidv4() }, // Start with one empty presentation by default (optional)
	];

	const [presentations, setPresentations] = useState(defaultPresentations);

	return (
		<ContentForm
			action={(formData) => {
				const data = {
					name: formData.get("name"),
					location: selectedLocation,
					producers: selectedProducersKeys,
					presentations,
					thursday: selectedThursday[1],
				};
				if (group) data.id = group.id;
				onSubmit(data);
			}}
			button={group ? "Edit Group" : "Add Group"}
		>
			<FormLabel>{group ? "Edit Name" : "Add Name"}</FormLabel>
			<FormInput>
				<Input style={{ width: "100%" }} name="name" defaultValue={group?.name} required />
			</FormInput>

			<FormLabel>{group ? "Edit Location" : "Add Location"}</FormLabel>
			<FormInput>
				<LocationSelect defaultValue={selectedLocation} onChange={setSelectedLocation} />
			</FormInput>

			<FormLabel>Edit Thursday</FormLabel>
			<FormInput>
				<Cascader style={{ width: "100%" }} options={thursdays} onChange={setSelectedThursday} defaultValue={selectedThursday} />
			</FormInput>

			<FormLabel>Producers</FormLabel>
			<FormInput>
				<UsersTransfer users={users} selectedUserKeys={selectedProducersKeys} setSelectedUserKeys={setSelectedProducersKeys} />
			</FormInput>

			<FormLabel>Presentations</FormLabel>
			<PresentationsField users={users} defaultPresentations={defaultPresentations} onChange={setPresentations} />
		</ContentForm>
	);
}
