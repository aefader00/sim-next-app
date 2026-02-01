"use client";

import Control from "./Control";
import { useRouter } from "next/navigation";

export default function Button({ href, onClick, children, ...props }) {
	const router = useRouter();

	const handleClick = (e) => {
		if (href) {
			e.preventDefault(); // prevent default just in case
			router.push(href); // navigate programmatically
		}
		if (onClick) onClick(e); // call any passed onClick
	};

	return (
		<Control as="button" onClick={handleClick} {...props}>
			{children}
		</Control>
	);
}
