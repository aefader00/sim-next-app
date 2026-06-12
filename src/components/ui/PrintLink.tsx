"use client";

interface PrintLinkProps {
	label?: string;
}

export default function PrintLink({ label = "Print" }: PrintLinkProps) {
	return (
		<button
			type="button"
			className="buttonless-link buttonless-link-button"
			onClick={() => window.print()}
		>
			<span className="buttonless-link-text">{label}</span>
			<svg
				className="buttonless-link-icon"
				aria-hidden="true"
				viewBox="0 0 16 16"
				focusable="false"
			>
				<path
					d="M9.25 3.25 14 8l-4.75 4.75M13.25 8H2"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.8"
				/>
			</svg>
		</button>
	);
}
