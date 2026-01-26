import ManageContentTable from "./ManageContentTable";

export default function ManageUsersTable({ users = [] }) {
	return (
		<ManageContentTable
			head={
				<tr>
					<th>Name</th>
					<th>Productions</th>
					<th>Presentations</th>
				</tr>
			}
			body={users.map((u) => (
				<tr key={u.id}>
					<td>{u.name}</td>
					<td>{u.productions}</td>
					<td>{u.presentations}</td>
				</tr>
			))}
		/>
	);
}
