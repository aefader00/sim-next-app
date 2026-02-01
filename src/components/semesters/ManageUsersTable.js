import ManageContentTable from "./ManageContentTable";
import Button from "../ui/Button";
import Link from "next/link";

export default function ManageUsersTable({ users = [], semester }) {
	return (
		<ManageContentTable
			head={
				<tr>
					<th>Name</th>
					<th>Productions</th>
					<th>Presentations</th>
				</tr>
			}
			body={users.map((user) => {
				const groupsFromSemester = [];

				semester.thursdays.map((thursday) => {
					user.productions.map((group) => {
						if (group.thursday_id === thursday.id) {
							group.date = thursday.date;
							groupsFromSemester.push(group);
						}
					});
				});

				const worksFromSemester = [];

				semester.thursdays.map((thursday) => {
					thursday.groups.map((group) => {
						group.presentations.map((presentation) => {
							presentation.presenters.map((presenter) => {
								if (presenter.id === user.id) {
									presentation.thursday_id = thursday.id;
									worksFromSemester.push(presentation);
								}
							});
						});
					});
				});

				const groupsBeforeMid = groupsFromSemester.slice(0, Math.ceil(groupsFromSemester.length / 2));
				const groupsAfterMid = groupsFromSemester.slice(Math.ceil(groupsFromSemester.length / 2));

				return (
					<tr key={user.id}>
						<td>
							<Link href={`/users/${user.username}/`}>{user.name}</Link>
						</td>

						<td>
							Total in Semester: {worksFromSemester.length}
							<ul>
								{worksFromSemester.map((presentation) => (
									<li key={`presentation.id:${presentation.id}`}>
										<Link href={`/thursdays/${presentation.thursday_id}`}> {presentation.name}</Link>
									</li>
								))}
							</ul>
						</td>

						<td>
							<div>Total Before Middle of Semester: {groupsBeforeMid.length}</div>
							<ul>
								{groupsBeforeMid.map((group) => (
									<li key={`group.id:${group.id}`}>
										<Link href={`/thursdays/${group.thursday_id}`}>
											{group.name} ({group.date.toLocaleDateString()})
										</Link>
									</li>
								))}
							</ul>
							<hr />
							<div>Total After Middle of Semester: {groupsAfterMid.length}</div>
							<ul>
								{groupsAfterMid.map((group) => (
									<li key={`group.id:${group.id}`}>
										<Link href={`/thursdays/${group.thursday_id}`}>
											{group.name} ({group.date.toLocaleDateString()})
										</Link>
									</li>
								))}
							</ul>
						</td>
					</tr>
				);
			})}
		/>
	);
}
