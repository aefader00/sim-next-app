"use client";

import { useState } from "react";

import { Input, Select, Transfer } from "antd";

import { ContentForm, FormLabel, FormInput } from "../../../components/ContentForm";

export default function WorkForm({ onSubmit, work, semester_ids, users, groups }) {
	const [selectedMedium, setSelectedMedium] = useState(work?.medium || "Other");
	const handleSelectedMediumChange = (event) => {
		setSelectedMedium(event);
	};
	const [selectedSemester, setSelectedSemester] = useState(work?.semester_id || semester_ids[0].value);
	const handleSelectedSemesterChange = (event) => {
		setSelectedSemester(event);
	};
	const [selectedUsersKeys, setSelectedUsersKeys] = useState(work?.users.map(({ id }) => id) || []);
	const handleSelectedUsersKeysChange = (event) => {
		setSelectedUsersKeys(event);
	};
	const [selectedGroupsKeys, setSelectedGroupsKeys] = useState(work?.groups.map(({ id }) => id) || []);
	const handleSelectedGroupsKeysChange = (event) => {
		setSelectedGroupsKeys(event);
	};
	return (
		<ContentForm
			action={(formData) => {
				const data = {
					name: formData.get("name"),
					about: formData.get("about"),
					medium: selectedMedium,
					users: selectedUsersKeys,
					groups: selectedGroupsKeys,
					semester: selectedSemester,
				};
				if (work) {
					data.id = work.id;
				}
				onSubmit(data);
			}}
			button={work ? "Edit Work" : "Add Work"}
		>
			<FormLabel>{work ? "Edit Name" : "Add Name"}</FormLabel>
			<FormInput>
				<Input name="name" defaultValue={work?.name} required />
			</FormInput>

			<FormLabel>{work ? "Edit Medium" : "Add Medium"}</FormLabel>
			<FormInput>
				<Select
					style={{ width: "12rem" }}
					options={[
						{ value: "Ceramics", label: "Ceramics" },

						{ value: "Electronic Art", label: "Electronic Art" },

						{ value: "Fashion", label: "Fashion " },

						{ value: "Video", label: "Video" },

						{ value: "Glass", label: "Glass" },

						{ value: "Illustration", label: "Illustration" },

						{ value: "Writing", label: "Writing" },

						{ value: "Painting", label: "Painting" },

						{ value: "Performance", label: "Peformance" },

						{ value: "Photography", label: "Photography" },

						{ value: "Sculpture", label: "Sculpture" },

						{ value: "Sound", label: "Sound" },

						{ value: "Other", label: "Other" },
					]}
					showSearch
					onChange={handleSelectedMediumChange}
					defaultValue={selectedMedium}
				/>
			</FormInput>

			<FormLabel>{work ? "Edit About" : "Add About"}</FormLabel>
			<FormInput>
				<Input name="about" defaultValue={work?.about} required />
			</FormInput>

			<FormLabel>Select Authors of this Work</FormLabel>
			<FormInput>
				<Transfer dataSource={users} targetKeys={selectedUsersKeys} onChange={handleSelectedUsersKeysChange} oneWay showSearch render={(item) => item.name} />
			</FormInput>

			<FormLabel>Select Semester this Work was Created in</FormLabel>
			<FormInput>
				<Select style={{ width: "12rem" }} options={semester_ids} showSearch onChange={handleSelectedSemesterChange} defaultValue={selectedSemester} />
			</FormInput>

			<FormLabel>Select Groups to Present this Work</FormLabel>
			<FormInput>
				<Transfer
					dataSource={groups}
					targetKeys={selectedGroupsKeys}
					onChange={handleSelectedGroupsKeysChange}
					oneWay
					showSearch
					render={(item) => item.name}
				/>
			</FormInput>
		</ContentForm>
	);
}
