// LinkButton.js
"use client";

import Control from "./Control";

export default function LinkButton({ href, children, ...props }) {
	return (
		<Control as="a" href={href} {...props}>
			{children}
		</Control>
	);
}
