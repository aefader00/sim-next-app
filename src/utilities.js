import React from "react";

export function getArrayfromSelectedKeys(array = [], selectedKeys = []) {
	const map = new Map((array || []).map((obj) => [obj.key, obj]));
	return (selectedKeys || []).map((key) => map.get(key)).filter(Boolean); // remove undefined
}

/**
 * Accepts an array of React elements only.
 * Returns nicely formatted list with commas and "and".
 */
export function formatNiceListFromArray(elements = []) {
	if (!elements.length) return null;

	// Filter out any non-elements just in case
	const items = elements.filter(React.isValidElement);

	if (items.length === 0) return null;
	if (items.length === 1) return items[0];
	if (items.length === 2)
		return (
			<>
				{items[0]} and {items[1]}
			</>
		);

	const firstItems = items.slice(0, -1).map((el, idx) => <React.Fragment key={idx}>{el}, </React.Fragment>);

	const lastItem = items[items.length - 1];

	return (
		<>
			{firstItems}and {lastItem}
		</>
	);
}
