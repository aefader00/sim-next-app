import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "@/components/layout/PageContent/PageContent.module.css";

interface PageContentProps {
	children: ReactNode;
	className?: string;
}

export default function PageContent({
	children,
	className,
}: PageContentProps) {
	return (
		<div className={clsx(styles.root, className)} data-page-content>
			{children}
		</div>
	);
}
