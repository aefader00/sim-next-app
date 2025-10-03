// import styles
import styles from "../../components/admin/admin.module.css";
import Link from "next/link";
import { getFilteredUsers, getAllSemesters, getSemesterFromName } from "../../actions";

import SearchBar from "../../components/searchbar";

import AddContentButton from "../../components/AddContentButton";

import LinkButton from "../../components/linkbutton";

export default async function Admin({ searchParams }) {
	const filters = await searchParams;

	const users = await getFilteredUsers(filters);

	const semesters = await getAllSemesters();

	const semester = await getSemesterFromName(filters.semester);

	return (
		<div className={styles.AdminTable}>
			<div className={styles.ManageSemesters}>
				<h1>
					Manage Semesters
					<AddContentButton href="admin/semesters/add" />
				</h1>
				Below are all of the semesters we have on record in our database. You can edit them individually, including which students are enrolled in it. You can
				also remove them from the database.
				<div style={{ margin: "0.5rem", backgroundColor: "lightgrey", borderRadius: "0.33rem", padding: "1rem" }}>
					{semesters.map((semester) => {
						let groups = 0;
						semester.thursdays.forEach((thursday) => {
							groups += thursday.groups.length;
						});

						return (
							<div className={styles.SemesterCard} key={semester.id}>
								<h3 style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
									{semester.name} <LinkButton style={{ margin: "0rem" }} href={`admin/semesters/${semester.id}/edit`} value="✏️" />
								</h3>
								<div>Students Enrolled: {semester.users.length}</div> <div>Groups Produced: {groups}</div>{" "}
								<div>Thursday Classes: {semester.thursdays.length}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.ManageStudents}>
				<h1>Manage Students</h1>
				<p>
					Below are all of the students enrolled in the `&quot;`{`${semester.name}`}`&quot;` semester. You can edit the profile of each student by clicking on
					the button next to their name. The presentations tab lists how many times this student has presented throughout the whole semester up until the
					present. The productions tab shows how many times this student has produced a group, sorted into two groups based on whetehr they producted it before
					or after halfway through the semester.
				</p>
				<SearchBar semesters={semesters} />
				<div style={{ margin: "0.5rem", backgroundColor: "lightgrey", borderRadius: "0.33rem", padding: "1rem" }}>
					<div className={styles.StudentsTable}>
						<div className={styles.StudentsTableHeader}>Name</div>

						<div className={styles.StudentsTableHeader}>Works Made</div>

						<div className={styles.StudentsTableHeader}>Group Produced</div>

						{users.map((user) => {
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
								<div style={{ display: "contents" }} key={user.id}>
									<span>
										<h3 style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
											{user.name} <LinkButton style={{ margin: "0rem" }} href={`/users/${user.username}/edit`} value="✏️" />
										</h3>
									</span>

									<span>
										Total in the Semester: {worksFromSemester.length}
										<ul>
											{worksFromSemester.map((presentation) => (
												<li key={`presentation.id:${presentation.id}`}>
													<Link href={`/thursdays/${presentation.thursday_id}`}> {presentation.name}</Link>
												</li>
											))}
										</ul>
									</span>

									<span>
										<div>Total Before Middle of the Semester: {groupsBeforeMid.length}</div>
										{groupsBeforeMid.map((group) => (
											<li key={`group.id:${group.id}`}>
												<Link href={`/thursdays/${group.thursday_id}`}>
													{" "}
													{group.name} ({group.date.toLocaleDateString()})
												</Link>
											</li>
										))}
										<hr />
										<div>Total After Middle of the Semester: {groupsAfterMid.length}</div>
										{groupsAfterMid.map((group) => (
											<li key={`group.id:${group.id}`}>
												<Link href={`/thursdays/${group.thursday_id}`}>
													{" "}
													{group.name} ({group.date.toLocaleDateString()})
												</Link>
											</li>
										))}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
