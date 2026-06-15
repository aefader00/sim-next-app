import styles from "@/components/layout/PageTitle/PageTitle.module.css";

interface PageTitleProps {
	title: string;
	filter?: string | null;
}

export default function PageTitle({ title, filter }: PageTitleProps) {
	return (
		<div className={styles.root} data-page-title>
			<h2 className={styles.title}>
				<span>{filter ? `${title},` : title}</span>
				{filter ? (
					<span className={styles.filter}>{filter}</span>
				) : null}
			</h2>
		</div>
	);
}
