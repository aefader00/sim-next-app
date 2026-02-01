import Control from "../ui/Control";
import Image from "next/image";
import styles from "./UserCard.module.css";

export default function UserCard({ user }) {
	return (
		<Control as="a" href={`/users/${user.username}`} className={styles.UserCard}>
			<div className={`${styles.faceContent} ${styles.UserCardFace}`}>
				<div className={styles.imageWrapper}>
					<Image
						src={user.image}
						alt={`${user.name}'s face`}
						fill
						style={{
							objectFit: "cover",
							borderRadius: "5px",
							border: "2px solid #222222",
						}}
					/>
				</div>
				<div className={styles.name}>{user.name}</div>
			</div>
		</Control>
	);
}
