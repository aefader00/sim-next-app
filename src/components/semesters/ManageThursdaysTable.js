import ManageContentTable from "./ManageContentTable";
import Link from "next/link";
import { formatNiceListFromArray } from "../../utilities";

export default function ManageThursdaysTable({ thursdays = [] }) {
	return (
		<ManageContentTable
			head={
				<tr>
					<th>Name</th>
					<th>Date</th>
					<th>Productions</th>
					<th>Presentations</th>
				</tr>
			}
			body={thursdays.map((u) => (
				<tr key={u.id}>
					<td>
						<Link href={`/thursdays/${u.id}`}>{u.name}</Link>
					</td>
					<td>{u.date?.toLocaleDateString() || ""}</td>

					<td>
						<ul>
							{(u.groups || []).map((group) => (
								<li key={`group.id:${group.id}`}>
									<>
										<Link href={`/thursdays/${group.thursday_id}`}>{group.name}</Link>
										{group.producers?.length > 0 && (
											<>
												{" by "}
												{formatNiceListFromArray(
													group.producers.map((p) => (
														<Link key={`p.id:${p.id}`} href={`/users/${p.username}/`}>
															{p.name}
														</Link>
													)),
												)}
											</>
										)}
									</>
								</li>
							))}
						</ul>
					</td>

					<td>
						<ul>
							{(u.groups || []).flatMap((group) =>
								(group.presentations || []).map((work) => (
									<li key={`work.id:${work.id}`}>
										<>
											<Link href={`/thursdays/${group.thursday_id}`}>{work.name}</Link>
											{work.presenters?.length > 0 && (
												<>
													{" by "}
													{formatNiceListFromArray(
														work.presenters.map((author) => (
															<Link key={`author.id:${author.id}`} href={`/users/${author.username}/`}>
																{author.name}
															</Link>
														)),
													)}
												</>
											)}
										</>
									</li>
								)),
							)}
						</ul>
					</td>
				</tr>
			))}
		/>
	);
}
