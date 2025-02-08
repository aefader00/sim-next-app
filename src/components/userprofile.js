import styles from "../app/users/[id]/user.module.css";

export default async function UserProfile({ user, userData }) {
	return (
		<div className={styles.UserTable}>
			<div className={styles.UserImage}>
				<img src={user.image} alt={`${user.name}'s image`} />
			</div>
			{userData}
		</div>
	);
}
