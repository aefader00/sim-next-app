import ManageContentTable from "./ManageContentTable";
import Link from "next/link";

import { formatNiceListFromArray } from "../../utilities";

export default function ManageThursdaysTable({ thursdays = [] }) {
	console.log(thursdays);

	return (
		<ManageContentTable
			head={
				<tr>
					<th>Name</th>
					<th>Date</th>
					<th>Producers</th>
					<th>Presentations</th>
				</tr>
			}
			body={thursdays.map((u) => (
				<tr key={u.id}>
					<td>{u.name}</td>
					<td>{u.date.toLocaleDateString()}</td>
					<td>
						<ul>
							{u.groups.map((group) => (
								<li key={`group.id:${group.id}`}>
									<Link href={`/thursdays/${group.thursday_id}`}>
										{group.name} by {formatNiceListFromArray(group.producers.map((p) => p.name))}
									</Link>
								</li>
							))}
						</ul>
					</td>
					<td>
						<ul>
							{u.groups.map((group) =>
								group.presentations.map((work) => (
									<li key={`work.id:${work.id}`}>
										<Link href={`/thursdays/${group.thursday_id}`}>
											{work.name} by {formatNiceListFromArray(work.presenters.map((p) => p.name))}
										</Link>
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
