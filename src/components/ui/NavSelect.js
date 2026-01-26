"use client";

import { useRouter, usePathname } from "next/navigation";
import SelectInput from "@/components/ui/SelectInput";

export default function NavSelect({ pages }) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<SelectInput value={pathname} onChange={(e) => router.push(e.target.value)}>
			{pages.map((p) => (
				<option key={p.href} value={p.href}>
					{p.label}
				</option>
			))}
		</SelectInput>
	);
}
