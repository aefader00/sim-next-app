import Link from "next/link";
import AddContentButton from "../AddContentButton";
import EditContentButton from "../EditContentButton";
import styles from "./thursdaycard.module.css";
import WorkCard from "./groups/works/WorkCard";
export default function ThursdayCard({ thursday }) {
	return (
		<div className={styles.ThursdayCard}>
			<h1>
				<Link href={`/thursdays/${thursday.id}`}>
					<b>{thursday.name}</b> ({thursday.date.toLocaleDateString()})
				</Link>
				<EditContentButton href={`/thursdays/${thursday.id}/edit`} />
			</h1>
			<div className={styles.GroupsTable}>
				<h2>
					Groups
					<AddContentButton href={`/thursdays/${thursday.id}/groups/add`} />
				</h2>
				{thursday.groups.length > 0 ? (
					thursday.groups.map((group) => {
						var producers = group.producers.filter((user) => user.admin === false);
						var faculty = group.producers.filter((user) => user.admin === true);
						return (
							<div className={styles.GroupCard} key={group.id}>
								<h3>
									<b>{group.name}</b> ({group.location})
									<EditContentButton href={`/thursdays/${thursday.id}/groups/${group.id}/edit`} />
								</h3>
								<hr />
								<div>
									<b>Faculty:</b>
									<ul>
										{faculty.length > 0 ? (
											faculty.map((faculty) => {
												return (
													<li key={`faculty.id:${faculty.id}`}>
														<Link href={`/users/${faculty.username}`}>{faculty.name}</Link>
													</li>
												);
											})
										) : (
											<li>
												<i>There are no faculty for this group yet.</i>
											</li>
										)}
									</ul>
								</div>
								<div>
									<b>Producers:</b>
									<ul>
										{producers.length > 0 ? (
											producers.map((producer) => {
												return (
													<li key={`producer.id:${producer.id}`}>
														<Link href={`/users/${producer.username}`}>{producer.name}</Link>
													</li>
												);
											})
										) : (
											<li>
												<i>There are no producers for this group yet.</i>
											</li>
										)}
									</ul>
								</div>

								<div>
									<b>Presentations:</b>
									{group.presentations.length > 0 ? (
										group.presentations?.map((work) => {
											return <WorkCard key={work.id} work={work} />;
										})
									) : (
										<p>
											<i>There are no presented works for this group yet.</i>
										</p>
									)}
								</div>
							</div>
						);
					})
				) : (
					<p>
						<i>There are no groups in this Thursday yet.</i>
					</p>
				)}
			</div>
		</div>
	);
}
