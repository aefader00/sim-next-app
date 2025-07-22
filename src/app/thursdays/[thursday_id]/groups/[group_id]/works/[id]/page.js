import { notFound } from "next/navigation";

import { getWork } from "../../../../../../../actions";

import WorkCard from "../../../../../../../components/thursdays/groups/works/WorkCard";

export default async function Work({ params }) {
	// Get the user data of the user you are looking at.
	const { id } = await params;
	const work = await getWork(id);

	if (!work) {
		notFound();
	}

	return <WorkCard work={work} />;
}
