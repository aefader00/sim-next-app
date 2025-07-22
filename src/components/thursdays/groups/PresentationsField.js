"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import WorkForm from "./works/WorkForm";
import Button from "../../button";

export default function PresentationsField({ defaultPresentations = [], onChange, users }) {
	const [presentations, setPresentations] = useState(() =>
		defaultPresentations.map((presentation) => ({ ...presentation, index: presentation.index ?? uuidv4() }))
	);

	useEffect(() => {
		onChange(presentations);
	}, [presentations]);

	const handleChange = (index, newData) => {
		const updated = [...presentations];
		updated[index] = { ...updated[index], ...newData };
		setPresentations(updated);
	};

	const handleAdd = () => {
		setPresentations((prev) => [...prev, { index: uuidv4(), name: "", about: "", presenters: [] }]);
	};

	const handleDelete = (index) => {
		setPresentations((prev) => prev.filter((presentation) => presentation.index !== index));
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "lightgrey", borderRadius: "0.5rem", margin: "0.5rem" }}>
			{presentations.map((presentation, index) => (
				<WorkForm
					key={presentation.index}
					index={index}
					defaultValue={presentation}
					users={users}
					onChange={(data) => handleChange(index, data)}
					onDelete={() => handleDelete(presentation.index)}
				/>
			))}
			<Button onClick={handleAdd} value="Add a New Presentation" />
		</div>
	);
}
