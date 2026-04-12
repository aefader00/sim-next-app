import ManageContentTable from "./ManageContentTable";
import Link from "next/link";

export default function ManageUsersTable({ users = [], semester }) {
	// Calculate middle date of semester
	const thursdayDates = (semester.thursdays || []).map((t) => t.date).sort((a, b) => new Date(a) - new Date(b));
	const midIndex = Math.floor(thursdayDates.length / 2);
	const middleDate = thursdayDates[midIndex] || new Date(); // fallback if empty

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
				// Gather all productions in the semester
				const groupsFromSemester = [];
				(semester.thursdays || []).forEach((thursday) => {
					(user.productions || []).forEach((group) => {
						if (group.thursday_id === thursday.id) {
							groupsFromSemester.push({ ...group, date: thursday.date });
						}
					});
				});

				// Gather all works the user is part of
				const worksFromSemester = [];
				(semester.thursdays || []).forEach((thursday) => {
					(thursday.groups || []).forEach((group) => {
						(group.presentations || []).forEach((presentation) => {
							(presentation.presenters || []).forEach((presenter) => {
								if (presenter.id === user.id) {
									worksFromSemester.push({ ...presentation, thursday_id: thursday.id, date: thursday.date });
								}
							});
						});
					});
				});

				// Split works based on date compared to middleDate
				const worksBeforeMid = worksFromSemester.filter((work) => new Date(work.date) < new Date(middleDate));
				const worksAfterMid = worksFromSemester.filter((work) => new Date(work.date) >= new Date(middleDate));

				return (
					<tr key={user.id}>
						<td>
							<Link href={`/users/${user.username}/`}>{user.name}</Link>
						</td>

						<td>
							Total in Semester: {groupsFromSemester.length}
							<ul>
								{(groupsFromSemester || []).map((production) => (
									<li key={`production.id:${production.id}`}>
										<Link href={`/thursdays/${production.thursday_id}`}>
											{production.name} ({production.date.toLocaleDateString()})
										</Link>
									</li>
								))}
							</ul>
						</td>

						<td>
							<div>Total Before Middle of Semester: {worksBeforeMid.length}</div>
							<ul>
								{worksBeforeMid.map((work) => (
									<li key={`work.id:${work.id}`}>
										<Link href={`/thursdays?semester=All&thursdays=${work.group_id}`}>
											{work.name} ({work.date.toLocaleDateString()})
										</Link>
									</li>
								))}
							</ul>
							<hr />
							<div>Total After Middle of Semester: {worksAfterMid.length}</div>
							<ul>
								{worksAfterMid.map((work) => (
									<li key={`work.id:${work.id}`}>
										<Link href={`/thursdays?semester=All&thursdays=${work.group_id}`}>
											{work.name} ({work.date.toLocaleDateString()})
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
