import Link from "next/link";
import styles from "./WorkCard.module.css";
import EditContentButton from "../../../components/EditContentButton";
import { formatNiceListFromArray } from "../../../utilities";

export default function WorkCard({ work }) {
	const authors = work.users.map((author) => (
		<Link key={`author.id:${author.id}`} href={`/users/${author.username}/`}>
			{author.name}
		</Link>
	));
	return (
		<div className={styles.WorkCard}>
			<h3>
				<Link href={`/works/${work.id}`}>
					<b>{work.name}</b>
				</Link>
				<> ({work.medium})</>
				<EditContentButton href={`/works/${work.id}/edit`} />
			</h3>
			<p>{work.about}</p>
			{authors.length > 0 ? (
				<span>
					<> by </>
					{formatNiceListFromArray(authors)}
				</span>
			) : (
				"No user is credited as an author of this work."
			)}
		</div>
	);
}
