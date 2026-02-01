import { getUser, getCurrentUser } from "../../../actions";
import NotFound from "../../../components/not-found";
import WorkCard from "@/components/thursdays/groups/works/WorkCard";
import Button from "@/components/ui/Button";
import styles from "../../../components/users/user.module.css";
import SearchBar from "@/components/ui/SearchBar";
import Link from "next/link";

export default async function User({ params }) {
	const { username } = await params;
	const user = await getUser(username);
	if (!user) return <NotFound category={"User"} query={username} />;

	const currentUser = await getCurrentUser();
	if (!currentUser) return;

	const canEdit = currentUser.admin || user.id === currentUser.id;

	return (
		<div className={styles.UserTable}>
			{/* LEFT: PHOTO */}
			<div className={styles.UserImage}>
				<img src={user.image} alt={`${user.name}'s image`} />
			</div>

			{/* RIGHT: CONTENT */}
			<div>
				<SearchBar
					title={
						<div style={{ fontWeight: "bolder", fontSize: "2rem" }}>
							{user.name}
							{user.admin ? " ✨" : null}
						</div>
					}
				>
					{canEdit && (
						<Button href={`./${user.username}/edit`} className={styles.EditButton}>
							Edit Profile
						</Button>
					)}
				</SearchBar>

				<div className={styles.UserData}>
					<div className={styles.DataRow}>
						<div className={styles.Label}>Pronouns</div>
						<div className={styles.Value}>{user.pronouns?.length > 0 ? user.pronouns : "This user has not set their pronouns yet."}</div>
					</div>

					<div className={styles.DataRow}>
						<div className={styles.Label}>About</div>
						<div className={styles.Value}>{user.about?.length > 0 ? user.about : "This user has not written an about yet."}</div>
					</div>

					<div className={styles.DataRow}>
						<div className={styles.Label}>Presentations</div>
						<div className={styles.Value}>
							{user.presentations?.length > 0 ? (
								user.presentations.map((work) => <WorkCard key={work.id} work={work} />)
							) : (
								<i>This user has not presented any work yet.</i>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
