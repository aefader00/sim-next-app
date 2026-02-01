import ManageContentTable from "./ManageContentTable";
import Link from "next/link";
import { formatNiceListFromArray } from "../../utilities";

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
				// Filter groups this user is part of in this semester
				const groupsFromSemester = [];
				semester.thursdays.forEach((thursday) => {
					(user.productions || []).forEach((group) => {
						if (group.thursday_id === thursday.id) {
							groupsFromSemester.push({ ...group, date: thursday.date });
						}
					});
				});

				// Filter presentations this user is part of
				const worksFromSemester = [];
				semester.thursdays.forEach((thursday) => {
					(thursday.groups || []).forEach((group) => {
						(group.presentations || []).forEach((presentation) => {
							(presentation.presenters || []).forEach((presenter) => {
								if (presenter.id === user.id) {
									worksFromSemester.push({ ...presentation, thursday_id: thursday.id });
								}
							});
						});
					});
				});

				// Split groups into before and after middle
				const mid = Math.ceil(groupsFromSemester.length / 2);
				const groupsBeforeMid = groupsFromSemester.slice(0, mid);
				const groupsAfterMid = groupsFromSemester.slice(mid);

				return (
					<tr key={user.id}>
						<td>
							<Link href={`/users/${user.username}/`}>{user.name}</Link>
						</td>

						<td>
							Total in Semester: {worksFromSemester.length}
							<ul>
								{(worksFromSemester || []).map((presentation) => (
									<li key={`presentation.id:${presentation.id}`}>
										<Link href={`/thursdays/${presentation.thursday_id}`}>{presentation.name}</Link>
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
