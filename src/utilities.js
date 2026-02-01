export function getArrayfromSelectedKeys(array = [], selectedKeys = []) {
	const map = new Map((array || []).map((obj) => [obj.key, obj]));
	return (selectedKeys || []).map((key) => map.get(key)).filter(Boolean); // remove undefined
}

export function formatNiceListFromArray(array = []) {
	if (!array.length) return null;

	// Handle primitive strings or objects with .key
	const items = array.map((item, i) => {
		const text = typeof item === "string" ? item : item.name || String(item);
		const key = typeof item === "string" ? `str-${i}` : item.key || `obj-${i}`;
		return { text, key };
	});

	if (items.length === 1) return <span key={`${items[0].key}-wrapper`}>{items[0].text}</span>;
	if (items.length === 2)
		return (
			<span>
				{items[0].text} and {items[1].text}
			</span>
		);

	const formatted = items.slice(0, -1).map((item) => <span key={`${item.key}-wrapper`}>{item.text}, </span>);
	formatted.push(<span key={`${items[items.length - 1].key}-wrapper`}>and {items[items.length - 1].text}</span>);
	return <>{formatted}</>;
}
