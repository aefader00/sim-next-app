import ManageContentTable from "./ManageContentTable";

export default function ManageUsersTable({ thursdays = [] }) {
	console.log(thursdays);

	return (
		<ManageContentTable
			head={
				<tr>
					<th>Name</th>
					<th>Date</th>
					<th>Presentations</th>
				</tr>
			}
			body={thursdays.map((u) => (
				<tr key={u.id}>
					<td>{u.name}</td>
					<td>{u.date.toLocaleDateString()}</td>
					<td>
						{u.groups.map((group) => {
							<div>{group.name}</div>;
						})}
					</td>
				</tr>
			))}
		/>
	);
}
