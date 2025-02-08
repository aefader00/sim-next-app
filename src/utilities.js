export function getArrayfromSelectedKeys(array, selectedKeys) {
	return selectedKeys.map((key) => new Map(array.map((object) => [object.key, object])).get(key));
}

export function formatNiceListFromArray(array) {
	let formattedNiceList = [];
	if (array.length === 1) {
		formattedNiceList = <span key={`${array[0].key}:wrapper`}>{array[0]}</span>;
	} else if (array.length === 2) {
		formattedNiceList = (
			<span>
				{array[0]} and {array[1]}
			</span>
		);
	} else {
		formattedNiceList = array.slice(0, -1).map((author) => <span key={`${author.key}:wrapper`}>{author}, </span>);
		formattedNiceList.push(<span key={`${array[array.length - 1].key}:wrapper`}>and {array[array.length - 1]}</span>);
	}

	return <>{formattedNiceList}</>;
}
