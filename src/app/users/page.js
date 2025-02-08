import { getFilteredUsers } from "../../actions";

import { ContentPage, ContentTable } from "../../components/contentpage";

import styles from "./users.module.css";
import UserCard from "./components/UserCard";

export default async function Users({ searchParams }) {
	const filters = await searchParams;

	const users = await getFilteredUsers(filters);

	return (
		<ContentPage header={<>Users</>}>
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
