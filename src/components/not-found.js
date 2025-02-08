export default function NotFound({ category, query }) {
	return (
		<div style={{ textAlign: "center" }}>
			There are no results for {category} {query}.
		</div>
	);
}
