import { getUser, getCurrentUser } from "../../../actions";

import NotFound from "../../../components/not-found";
import LinkButton from "../../../components/linkbutton";
import WorkCard from "@/components/thursdays/groups/works/WorkCard";

import styles from "../../../components/users/user.module.css";
import Link from "next/link";

export default async function User({ params }) {
	// Get the user data of the user you are looking at.
	const { username } = await params;
	const user = await getUser(username);

	if (!user) return <NotFound category={"User"} query={username} />;

	// Get the user data of the user you are signed in as.
	const currentUser = await getCurrentUser();
	if (!currentUser) return;

	console.log(user);

	return (
		<div className={styles.UserTable}>
			<div className={styles.UserImage}>
				<img src={user.image} alt={`${user.name}'s image`} />
			</div>
			<div>
				<h1 className={styles.UserName}>
					{user.name}
					{user.admin == true ? <>✨</> : null}
					{currentUser.admin == true || user.id == currentUser.id ? <LinkButton href={`./${user?.username}/edit`} value="Settings ⛭" /> : null}
				</h1>
				<hr />
				<ul className={styles.UserData}>
					<li>
						<label>About</label> <p>{user.about.length > 0 ? user.about : "This user has not written an about yet..."}</p>
					</li>
					<li>
						<label>Presentations</label>
						{user.presentations.length > 0 ? (
							user.presentations?.map((work) => {
								return <WorkCard key={work.id} work={work} />;
							})
						) : (
							<p>
								<i>This user has not presented any work yet.</i>
							</p>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
}
