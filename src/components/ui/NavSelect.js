"use client";

import { useRouter, usePathname } from "next/navigation";
import Control from "@/components/ui/Control";
import styles from "./Control.module.css";

export default function NavSelect({ pages }) {
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = (e) => {
		router.push(e.target.value);
	};
	return (
		<Control className={styles.inputFace} as="select" onChange={handleChange}>
			{pages.map((p) => (
				<option key={p.href} value={p.href}>
					{p.label}
				</option>
			))}
		</Control>
	);
}
