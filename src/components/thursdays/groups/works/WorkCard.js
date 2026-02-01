import Control from "@/components/ui/Control";
import Link from "next/link";
import styles from "./WorkCard.module.css";
import { formatNiceListFromArray } from "../../../../utilities";

export default function WorkCard({ work }) {
	const authors = work.presenters.map((author) => (
		<Link key={`author.id:${author.id}`} href={`/users/${author.username}/`}>
			{author.name}
		</Link>
	));

	return (
		<Control as="a" href={`/thursdays?semester=All&thursdays=${work.group_id}`} className={styles.WorkCard}>
			<div className={styles.content}>
				<h3>
					<b>{work.name}</b>
				</h3>
				<p>{work.about}</p>
				{authors.length > 0 ? (
					<span>
						<> by </>
						{formatNiceListFromArray(authors)}
					</span>
				) : (
					<span>No user is credited as an author of this work.</span>
				)}
			</div>
		</Control>
	);
}
