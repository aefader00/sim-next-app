"use server";

import { auth } from "../auth";

import { signIn, signOut } from "../auth";

import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "./database";

import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import path from "path";

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
	if (filters.user === undefined) {
		filters.user = "";
	}

	try {
		const users = await prisma.user.findMany({
			where: {
				OR: [{ name: { contains: `${filters.user}`, mode: "insensitive" } }],
				AND: defaultSemester,
			},

			orderBy: {
				name: "asc",
			},

			include: {
				productions: true,
				presentations: true,
				semesters: true,
			},
		});

		return users;
	} catch (error) {
		console.error("Database error!!!:", error);
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
				creators: true,
				group: true,
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
		include: { presentations: { include: { presenters: true } }, productions: true },
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

	if (name == undefined) {
		const semesters = await getAllSemesters();
		name = semesters[0].name;
	}

	const semester = await prisma.semester.findFirst({
		where: { name: { contains: name } },
		include: { users: true, thursdays: { include: { groups: { include: { presentations: { include: { presenters: true } } } } } } },
	});
	return semester;
}

export async function getThursday(id) {
	const thursday = await prisma.thursday.findFirst({
		where: { id: id },
		include: { groups: { include: { producers: true, presentations: { include: { presenters: true } } } } },
	});
	return thursday;
}

export async function getWork(id) {
	const work = await prisma.work.findFirst({
		where: { id: id },
		include: { group: true, presenters: true },
	});
	return work;
}

export async function getGroup(id) {
	const group = await prisma.group.findFirst({
		where: { id: id },
		include: { producers: true, presentations: { include: { presenters: true } }, thursday: true },
	});
	return group;
}

export async function editUser({ id, name, about, image, email, link, pronouns }) {
	return prisma.user.update({
		where: { id },
		data: { name, about, image, link, pronouns, email },
	});
}

export async function addUser(data) {
	const current_semester = await getAllSemesters();

	try {
		await prisma.user.create({
			data: {
				email: data.email,
				username: data.email.split("@")[0],
				image: data.image,
				name: data.name,
				about: data.about?.trim() || "I'm new to SIM!",
				link: data.link,
				pronouns: data.pronouns,
				semesters: { connect: { id: current_semester[0].id } },
			},
		});
	} catch (error) {
		throw new Error(error);
	}
}

export async function handleImageUpload(file, filename, directory) {
	if (!file || !filename) return null;

	const directory_path = path.join(process.cwd(), `public/${directory}`);
	await mkdir(directory_path, { recursive: true });

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const ext = file.name.split(".").pop();
	const filename_w_ext = `${filename}.${ext}`;
	const filepath = path.join(directory_path, filename_w_ext);

	const existing_files = await readdir(directory_path);
	const matching_files = existing_files.filter((f) => f.startsWith(`${filename}.`));

	await Promise.all(matching_files.map((f) => unlink(path.join(directory_path, f))));

	await writeFile(filepath, buffer);

	return `/${directory}/${filename_w_ext}`;
}

export async function removeUser(data) {
	await prisma.user.delete({
		where: {
			id: data.id,
		},
	});
}

export async function editGroup(data) {
	// Step 1: Update group basic info
	await prisma.group.update({
		where: { id: data.id },
		data: {
			name: data.name,
			location: data.location,
			producers: { set: data.producers.map((id) => ({ id })) },
			thursday: { connect: { id: data.thursday } },
		},
	});

	// Step 2: Get all current work IDs already in DB
	const existingWorks = await prisma.work.findMany({
		where: { group_id: data.id },
		select: { id: true },
	});
	const existingIds = existingWorks.map((w) => w.id);

	// Step 3: Split into new vs existing works
	const newPresentations = data.presentations.filter((p) => !p.id);
	const existingPresentations = data.presentations.filter((p) => p.id);
	const currentPresentationIds = existingPresentations.map((p) => p.id);

	// Step 4: Create new works
	await Promise.all(
		newPresentations.map((p) =>
			prisma.work.create({
				data: {
					name: p.name,
					about: p.about,
					image: p.image ?? "",
					group: { connect: { id: data.id } },
					presenters: {
						connect: p.presenters.map((id) => ({ id })),
					},
				},
			}),
		),
	);

	// ✅ Step 5: Update existing works and presenters
	await Promise.all(
		existingPresentations.map((p) =>
			prisma.work.update({
				where: { id: p.id },
				data: {
					name: p.name,
					about: p.about,
					image: p.image ?? "",
					presenters: {
						set: p.presenters.map((id) => ({ id })), // 👈 Replace presenters
					},
				},
			}),
		),
	);

	// Step 6: Delete removed works
	const worksToDelete = existingIds.filter((id) => !currentPresentationIds.includes(id));
	await Promise.all(
		worksToDelete.map((id) =>
			prisma.work.delete({
				where: { id },
			}),
		),
	);
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
			presenters: { set: data.users.map((id) => ({ id })) },
			group: { connect: { id: data.group } },
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
			include: { thursdays: { include: { groups: true } }, users: true },
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
			include: { productions: true, semesters: true },
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
			include: { presenters: true, group: true },
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
			include: { producers: true },
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
	if (filters.thursdays === undefined) {
		filters.thursdays = "";
	}

	try {
		const thursdays = await prisma.thursday.findMany({
			where: {
				OR: [
					{ name: { contains: `${filters.thursdays}`, mode: "insensitive" } },
					{
						groups: {
							some: {
								name: { contains: `${filters.thursdays}`, mode: "insensitive" },
							},
						},
					},
					{
						groups: {
							some: {
								id: { contains: `${filters.thursdays}`, mode: "insensitive" },
							},
						},
					},
					{
						groups: {
							some: {
								location: {
									contains: `${filters.thursdays}`,
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
					include: { producers: true, presentations: { include: { presenters: true } } },
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
		const group = await prisma.group.create({
			data: {
				name: data.name,
				location: data.location,
				producers: {
					connect: data.producers.map((id) => ({ id })),
				},
				thursday: {
					connect: { id: data.thursday },
				},
			},
		});
		await Promise.all(
			data.presentations.map((p) =>
				prisma.work.create({
					data: {
						name: p.name,
						about: p.about,
						image: p.image ?? "",
						group: { connect: { id: group.id } },
						presenters: {
							connect: p.presenters.map((id) => ({ id })),
						},
					},
				}),
			),
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error(`Failed to addGroup(data) with data:`);
	}
}

export async function addWork(data) {
	try {
		await prisma.work.create({
			data: {
				name: data.name,
				about: data.about,
				image: "", // One day, we should allow users to upload images for works so their art can be archived. For now, just pass an empty string.
				presenters: {
					connect: data.presenters.map((id) => ({ id })),
				},
				group: {
					connect: { id: data.group },
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
