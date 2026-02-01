export function getArrayfromSelectedKeys(array = [], selectedKeys = []) {
	const map = new Map((array || []).map((obj) => [obj.key, obj]));
	return (selectedKeys || []).map((key) => map.get(key)).filter(Boolean); // remove undefined
}

export function formatNiceListFromArray(array = []) {
	if (!array.length) return null;

	// array may contain strings or objects with .name
	const items = array.map((item) => (typeof item === "string" ? item : item.name || String(item)));

	if (items.length === 1) return <>{items[0]}</>;
	if (items.length === 2)
		return (
			<>
				{items[0]} and {items[1]}
			</>
		);

	const firstItems = items.slice(0, -1).join(", ");
	const lastItem = items[items.length - 1];
	return (
		<>
			{firstItems} and {lastItem}
		</>
	);
}
