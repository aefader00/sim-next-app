import { getFilteredWorks } from "../../actions";

import { ContentPage, ContentTable } from "../../components/contentpage";

import styles from "./works.module.css";
import AddContentButton from "../../components/AddContentButton";
import WorkCard from "./components/WorkCard";

export default async function Users({ searchParams }) {
	const filters = await searchParams;

	const works = await getFilteredWorks(filters);

	return (
		<ContentPage
			header={
				<>
					Work <AddContentButton href="/works/add" />
				</>
			}
		>
			<ContentTable items={works} filters={filters} category="Work">
				<div className={styles.WorksGrid}>
					{works.map((work) => {
						return <WorkCard key={work.id} work={work} />;
					})}
				</div>
			</ContentTable>
		</ContentPage>
	);
}
