export default function Content({ children }) {
	return (
		<div
			style={{
				margin: "1rem",
				padding: "1rem",
				backgroundColor: "rgba(211, 211, 211, 0.75)", // lightgrey with 0.8 opacity
				borderRadius: "0.33rem",
			}}
		>
			{children}
		</div>
	);
}
