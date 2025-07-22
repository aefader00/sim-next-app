import { ContentPage, ContentTable } from "../../components/contentpage";

import styles from "../../components/thursdays/thursdays.module.css";

import { getFilteredThursdays } from "../../actions";

import ThursdayCard from "../../components/thursdays/thursdaycard";

export default async function Thursdays({ searchParams }) {
	const filters = await searchParams;

	const thursdays = await getFilteredThursdays(filters);

	return (
		<ContentPage header={<>Thursdays</>}>
			<ContentTable items={thursdays} filters={filters} category={"Thursdays"}>
				<div className={styles.ThursdaysGrid}>
					{thursdays.map((thursday) => {
						return <ThursdayCard key={thursday.id} thursday={thursday} />;
					})}
				</div>
			</ContentTable>
		</ContentPage>
	);
}
