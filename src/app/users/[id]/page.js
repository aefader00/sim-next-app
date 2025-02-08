import { getUser, getCurrentUser } from "../../../actions";

import NotFound from "../../../components/not-found";
import LinkButton from "../../../components/linkbutton";
import UserProfile from "../../../components/userprofile";

import styles from "./user.module.css";

export default async function User({ params }) {
	// Get the user data of the user you are looking at.
	const { id } = await params;
	const user = await getUser(id);

	if (!user) return <NotFound category={"User"} query={id} />;

	// Get the user data of the user you are signed in as.
	const currentUser = await getCurrentUser();
	if (!currentUser) return;

	return (
		<UserProfile
			user={user}
			userData={
				<div>
					<h1 className={styles.UserName}>
						{user.name}
						{user.admin == true ? <>✨</> : null}
						{currentUser.admin == true || user.id == currentUser.id ? <LinkButton href={`./${user?.username}/edit`} value="⚙️" /> : null}
					</h1>
					<hr />
					<ul className={styles.UserData}>
						<li>
							<label>About</label> <p>{user.about}</p>
						</li>
					</ul>
				</div>
			}
		/>
	);
}
