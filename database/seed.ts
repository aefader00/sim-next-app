import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();
	await prisma.semester.deleteMany();
	await prisma.thursday.deleteMany();
	await prisma.group.deleteMany();
	await prisma.work.deleteMany();

	await prisma.user.create({
		data: {
			name: "",
			username: "",
			email: "",
			admin: true,
			image: "/faces/default.jpg",
			pronouns: "",
			link: "",
		},
	});

	await prisma.semester.create({
		data: {
			name: "SP25",
			thursdays: {
				create: [
					{
						date: "2025-01-23T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},
					{
						date: "2025-01-30T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-02-06T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},
					{
						date: "2025-02-13T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-02-20T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},
					{
						date: "2025-02-27T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-03-13T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-03-20T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},

					{
						date: "2025-04-03T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-04-10T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},
					{
						date: "2025-04-17T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},

					{
						date: "2025-04-25T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-05-01T00:00:00.000Z",
						name: "Small Group Day",
					},
					{
						date: "2025-05-08T00:00:00.000Z",
						name: "Big Group Day",
						groups: {
							create: [
								{
									name: "Big Group",
									location: "Pozen Center",
								},
							],
						},
					},
				],
			},
		},
	});
}

main()
	.catch((error) => {
		console.error(error.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
