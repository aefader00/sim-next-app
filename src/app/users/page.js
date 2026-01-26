import { getFilteredUsers } from "../../actions";

import { ContentPage, ContentTable } from "../../components/contentpage";
import AddContentButton from "@/components/AddContentButton";

import styles from "../../components/users/users.module.css";
import UserCard from "../../components/users/UserCard";

export default async function Users({ searchParams }) {
	const filters = await searchParams;
	const users = await getFilteredUsers(filters);
	return (
		<ContentPage
			query="user"
			header={
				<>
					Names & Faces <AddContentButton href="users/add" />
				</>
			}
		>
			<ContentTable items={users} filters={filters} category="User">
				<div className={styles.UsersGrid}>
					{users.map((user) => {
						return <UserCard key={user.id} user={user} />;
					})}
				</div>
			</ContentTable>
		</ContentPage>
	);
}
