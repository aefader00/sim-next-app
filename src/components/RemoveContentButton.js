"use client";

import React from "react";
import Button from "./button";

export default function RemoveContentButton({ data, onSubmit }) {
	const handleClick = () => {
		const confirmed = window.confirm(`Are you sure that you want to permanently remove ${data.name}'s data from the database? You can't undo this action.`);
		if (confirmed) {
			onSubmit(data);
		}
	};
	return <Button type="button" onClick={handleClick} value={`Remove ${data.name}?`} />;
}
