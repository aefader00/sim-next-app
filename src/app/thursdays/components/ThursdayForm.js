"use client";

import { useState } from "react";

import { DatePicker, Input, Select, Transfer } from "antd";

import { ContentForm, FormLabel, FormInput } from "../../../components/ContentForm";

import dayjs from "dayjs";

export default function ThursdayForm({ onSubmit, thursday, semester_ids, groups }) {
	const [date, setDate] = useState(thursday?.date || Date.now);
	const handleDateChange = (event) => {
		setDate(dayjs(event));
	};

	const [selectedSemester, setSelectedSemester] = useState(thursday?.semester_id || semester_ids[0].value);
	const handleSelectedSemesterChange = (event) => {
		setSelectedSemester(event);
	};

	const [selectedGroupsKeys, setSelectedGroupsKeys] = useState(thursday?.groups.map(({ id }) => id) || []);
	const handleSelectedGroupsKeysChange = (event) => {
		setSelectedGroupsKeys(event);
	};
	return (
		<ContentForm
			action={(formData) => {
				const data = {
					name: formData.get("name"),
					date: date.$d,
					groups: selectedGroupsKeys,
					semester: selectedSemester,
				};
				if (thursday) {
					data.id = thursday.id;
				}
				onSubmit(data);
			}}
			button={thursday ? "Edit Thursday" : "Add Thursday"}
		>
			<FormLabel>{thursday ? "Edit Name" : "Add Name"}</FormLabel>
			<FormInput>
				<Input name="name" defaultValue={thursday?.name} required />
			</FormInput>
			<FormLabel>Select Date</FormLabel>
			<FormInput>
				<DatePicker onChange={handleDateChange} defaultValue={dayjs(date)} />
			</FormInput>

			<FormLabel>Select Semester this Thursday is a part of</FormLabel>
			<FormInput>
				<Select style={{ width: "12rem" }} options={semester_ids} showSearch onChange={handleSelectedSemesterChange} defaultValue={selectedSemester} />
			</FormInput>

			<FormLabel>Select Groups</FormLabel>
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
