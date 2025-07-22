"use client";

import { Select } from "antd";

const locations = ["Pozen Center", "Sound Studio", "N181", "D307", "Godine Gallery"];

export default function LocationSelect({ defaultValue, onChange }) {
	return (
		<Select
			style={{ width: "100%" }}
			options={locations.map((location) => ({
				label: location,
				value: location,
			}))}
			onChange={onChange}
			defaultValue={defaultValue}
		/>
	);
}
