import Link from "next/link";
import styles from "./UserCard.module.css";
export default function UserCard({ user }) {
	return (
		<Link className={styles.UserCard} href={`/users/${user.username}`}>
			<img src={user.image} alt={`${user.name}'s Photo`} />
			<h3>{user.name}</h3>
		</Link>
	);
}
