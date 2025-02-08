"use server";

import { auth } from "../auth";

import { signIn, signOut } from "../auth";

import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "./prisma";

export async function getFilteredUsers(filters) {
	noStore();

	// This shows content from all semesters.
	let defaultSemester = { semesters: { some: { name: { contains: "" } } } };

	// If no semester is given, default to the most recent one.
	if (filters.semester == undefined) {
		const semesters = await getAllSemesters();
		defaultSemester = { semesters: { some: { id: semesters[0].id } } };
	} else {
		if (filters.semester != "All") {
			// Select a specific semester.
			defaultSemester = { semesters: { some: { name: { contains: filters.semester } } } };
		} // Else, keep the default.
	}

	// If there is no search query, use empty string so taht.
	if (filters.query === undefined) {
		filters.query = "";
	}

	try {
		const users = await prisma.user.findMany({
			where: {
				OR: [{ name: { contains: `${filters.query}`, mode: "insensitive" } }],
				AND: defaultSemester,
			},

			orderBy: {
				name: "asc",
			},

			include: {
				works: true,
				groups: true,
				semesters: true,
			},
		});

		return users;
	} catch (error) {
		console.error("Database error:", error);
		throw new Error(`Failed to get filtered users with filters: ${filters}`);
	}
}

export async function getFilteredWorks(filters) {
	noStore();

	// This shows content from all semesters.
	let defaultSemester = { semester: { name: { contains: "" } } };

	// If no semester is given, default to the most recent one.
	if (filters.semester == undefined) {
		const semesters = await getAllSemesters();
		defaultSemester = { semester: { id: semesters[0].id } };
	} else {
		if (filters.semester != "All") {
			// Select a specific semester.
			defaultSemester = { semester: { name: { contains: filters.semester } } };
		} // Else, keep the default.
	}

	// If there is no search query, use empty string so taht.
	if (filters.query === undefined) {
		filters.query = "";
	}

	try {
		const users = await prisma.work.findMany({
			where: {
				OR: [{ name: { contains: `${filters.query}`, mode: "insensitive" } }],
				AND: defaultSemester,
			},

			orderBy: {
				name: "asc",
			},

			include: {
				users: true,
				groups: true,
				semester: true,
			},
		});

		return users;
	} catch (error) {
		console.error("Database error:", error);
		throw new Error(`Failed to get filtered works with filters: ${filters}`);
	}
}

export async function getUser(username) {
	const user = await prisma.user.findFirst({
		where: { username: username },
	});
	return user;
}

export async function getSemester(id) {
	const semester = await prisma.semester.findFirst({
		where: { id: id },
		include: { users: true, thursdays: true },
	});
	return semester;
}

export async function getSemesterFromName(name) {
	if (name == "All") {
		name = "";
	}

	const semester = await prisma.semester.findFirst({
		where: { name: { contains: name } },
		include: { users: true, thursdays: { include: { groups: true } } },
	});
	return semester;
}

export async function getThursday(id) {
	const thursday = await prisma.thursday.findFirst({
		where: { id: id },
		include: { groups: { include: { users: true, works: { include: { users: true } } } } },
	});
	return thursday;
}

export async function getWork(id) {
	const work = await prisma.work.findFirst({
		where: { id: id },
		include: { groups: true, users: true },
	});
	return work;
}

export async function getGroup(id) {
	const group = await prisma.group.findFirst({
		where: { id: id },
		include: { users: true, works: true, thursday: true },
	});
	return group;
}

export async function editUser(data) {
	await prisma.user.update({
		where: {
			id: data.id,
		},
		data: { name: data.name, about: data.about },
	});
}

export async function editGroup(data) {
	await prisma.group.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			location: data.location,
			users: { set: data.users.map((id) => ({ id })) },
			works: { set: data.works.map((id) => ({ id })) },
			thursday: { connect: { id: data.thursday } },
		},
	});
}

export async function editThursday(data) {
	await prisma.thursday.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			date: data.date,
			groups: { set: data.groups.map((id) => ({ id })) },
			semester: { connect: { id: data.semester } },
		},
	});
}

export async function editSemester(data) {
	await prisma.semester.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			users: { set: data.users.map((id) => ({ id })) },
		},
	});
}

export async function editWork(data) {
	await prisma.work.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			medium: data.medium,
			about: data.about,
			users: { set: data.users.map((id) => ({ id })) },
			groups: { set: data.groups.map((id) => ({ id })) },
			semester: { connect: { id: data.semester } },
		},
	});
}

export async function getCurrentUser() {
	const session = await auth();
	if (session) {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});
		return user;
	}
	return null;
}

export async function isCurrentUserAdmin() {
	const user = await getCurrentUser();
	if (user) {
		return user.admin;
	} else {
		return false;
	}
}

export async function getAllSemesters() {
	try {
		const semesters = await prisma.semester.findMany({
			include: { thursdays: { include: { groups: true } }, users: true, works: true },
		});

		// Sort Semesters by Thursday dates.
		semesters.sort((a, b) => {
			const aFirstThursdayDate = a.thursdays.length > 0 ? a.thursdays[0].date : Infinity;
			const bFirstThursdayDate = b.thursdays.length > 0 ? b.thursdays[0].date : Infinity;
			return bFirstThursdayDate - aFirstThursdayDate;
		});

		return semesters;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch Semesters.");
	}
}

export async function getAllUsers() {
	try {
		const users = await prisma.user.findMany({
			include: { works: true, groups: true, semesters: true },
		});

		return users;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to getAllUsers().");
	}
}

export async function getAllWorks() {
	try {
		const works = await prisma.work.findMany({
			include: { users: true, groups: true },
		});

		return works;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to getAllWorks().");
	}
}

export async function getAllGroups() {
	try {
		const groups = await prisma.group.findMany({
			include: { works: true, users: true },
		});

		// Add keys to the users so we can transfer them.
		groups.map((group) => {
			group.key = groups.indexOf(group);
		});

		return groups;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to getAllUsers().");
	}
}

export async function getFilteredThursdays(filters) {
	noStore();

	// This shows content from all semesters.
	let defaultSemester = { semester: { name: { contains: "" } } };

	// If no semester is given, default to the most recent one.
	if (filters.semester == undefined) {
		const semesters = await getAllSemesters();
		defaultSemester = { semester: { id: semesters[0].id } };
	} else {
		if (filters.semester != "All") {
			// Select a specific semester.
			defaultSemester = { semester: { name: { contains: filters.semester } } };
		} // Else, keep the default.
	}

	// If there is no search query, use empty string so taht.
	if (filters.query === undefined) {
		filters.query = "";
	}

	try {
		const thursdays = await prisma.thursday.findMany({
			where: {
				OR: [
					{ name: { contains: `${filters.query}`, mode: "insensitive" } },
					{
						groups: {
							some: {
								name: { contains: `${filters.query}`, mode: "insensitive" },
							},
						},
					},
					{
						groups: {
							some: {
								location: {
									contains: `${filters.query}`,
									mode: "insensitive",
								},
							},
						},
					},
				],
				AND: defaultSemester,
			},

			orderBy: {
				date: "asc",
			},

			include: {
				groups: {
					include: { users: true, works: { include: { users: true } } },
				},
			},
		});

		return thursdays;
	} catch (error) {
		console.error("database error:", error);
		throw new Error("failed to fetch thursdays.");
	}
}

export async function addSemester(data) {
	const thursdays = [];
	data.dates.map((day) => {
		thursdays.push({
			name: data.dates.indexOf(day) % 2 == 0 ? "Big Day" : "Small Day",
			date: day,
		});
	});

	const people = [];
	data.users.map((user) => {
		people.push({ id: user });
	});

	try {
		await prisma.semester.create({
			data: {
				name: data.name,
				thursdays: {
					createMany: {
						data: thursdays,
					},
				},
				users: {
					connect: people,
				},
			},
		});
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to addSemester().");
	}
}

export async function addGroup(data) {
	try {
		await prisma.group.create({
			data: {
				name: data.name,
				location: data.location,
				users: {
					connect: data.users.map((id) => ({ id })),
				},
				works: {
					connect: data.works.map((id) => ({ id })),
				},
				thursday: {
					connect: { id: data.thursday },
				},
			},
		});
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to addGroup(data) with data:", data);
	}
}

export async function addWork(data) {
	try {
		await prisma.work.create({
			data: {
				name: data.name,
				about: data.about,
				medium: data.medium,
				image: "", // One day, we should allow users to upload images for works so their art can be archived. For now, just pass an empty string.
				users: {
					connect: data.users.map((id) => ({ id })),
				},
				groups: {
					connect: data.groups.map((id) => ({ id })),
				},
				semester: {
					connect: { id: data.semester },
				},
			},
		});
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to addGroup(data) with data:", data);
	}
}

export async function LogOut() {
	"use server";
	await signOut("google");
}

export async function LogIn() {
	"use server";
	await signIn("google");
}
