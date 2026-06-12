import { Suspense } from "react";
import { getFilteredUsers } from "@/actions/users";
import { getAllSemesters } from "@/actions/semesters";
import { Button } from "@/components/ui/AntD";
import { FilterInput, FilterSelect } from "@/components/ui/Filters";
import Split from "@/components/ui/Split";
import PrintLink from "@/components/ui/PrintLink";

import styles from "@/components/domain/users/Users.module.css";
import UserCard from "@/components/domain/users/UserCard";
import { auth } from "@/authentication";

interface UsersProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function formatSemesterCode(name?: string | null) {
	if (!name) return "";

	const code = name.match(/^(SP|FA)\d{2}$/i);
	if (code) return name.toUpperCase();

	const namedSemester = name.match(/^(Spring|Fall)\s+(\d{4})$/i);
	if (namedSemester) {
		const term = namedSemester[1].toLowerCase() === "spring" ? "SP" : "FA";
		return `${term}${namedSemester[2].slice(-2)}`;
	}

	return name;
}

async function UsersList({ filters }: { filters: any }) {
	const result = await getFilteredUsers(filters);
	const users = result.success ? result.data : [];

	if (users.length < 1) {
		return <div>There are no results for User {filters?.user}</div>;
	}

	return (
		<div className={styles.UsersGrid}>
			{users.map((user: any) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
}

export default async function UsersPage({ searchParams }: UsersProps) {
	const filters = await searchParams;
	const semestersResult = await getAllSemesters();
	const semesters = semestersResult.success ? semestersResult.data : [];
	const session = await auth();
	const isAdmin = session?.user?.role === "ADMIN";
	
	const semesterIdParam = Array.isArray(filters.semesterId) ? filters.semesterId[0] : filters.semesterId;
	const semesterParam = Array.isArray(filters.semester) ? filters.semester[0] : filters.semester;
	const semesterIdFilter = semesterIdParam || semesterParam;
	const defaultSemesterId = semesters[0]?.id || null;
	const selectedSemester = semesterIdFilter === "All"
		? null
		: semesters.find((semester: any) =>
			semester.id === (semesterIdFilter || defaultSemesterId) ||
			semester.name === (semesterIdFilter || defaultSemesterId)
		);
	const printTitle = selectedSemester
		? formatSemesterCode(selectedSemester.name)
		: "All Semesters";

	return (
		<>
			<Split
				className={styles.screenToolbar}
				start={<h2>Names & Faces</h2>}
				end={
					<>
						<FilterInput query={"user"} placeholder="Search user"/>
						<FilterSelect
							filter={"semesterId"}
							options={semesters}
							defaultValue={semesterIdFilter || defaultSemesterId}
							allLabel="All Semesters"
						/>
						<PrintLink />
						{isAdmin && <Button href="/users/add">Add User</Button>}
					</>
				}
			/>
			<div className={styles.resultsWrapper}>
				<h1 className={styles.printTitle}>{printTitle}</h1>
				<Suspense fallback={<div style={{ opacity: 0.5 }}>Loading users...</div>}>
					<UsersList filters={filters} />
				</Suspense>
			</div>
		</>
	);
}
