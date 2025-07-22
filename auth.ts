import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./src/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: "openid email profile https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			// Add a check for account being non-null
			if (!account) {
				console.error("Account is null or undefined");
				return false; // Prevent further execution if account is invalid
			}

			var defaultSemester;
			const firstSemester = await prisma.semester.findFirst({
				include: { thursdays: { include: { groups: true } }, users: true },
			});

			if (firstSemester) {
				defaultSemester = firstSemester;
			} else {
				defaultSemester = { id: "" };
			}

			const email = user.email as string;

			const isUserFound = await prisma.user.findFirst({ where: { email: email }, include: { accounts: true } });

			if (isUserFound?.accounts.length == 0) {
				try {
					await prisma.user.update({
						where: {
							// Check if the user already exists by email.
							email: email,
						},
						data: {
							accounts: {
								create: {
									type: account.type,
									provider: account.provider,
									providerAccountId: account.providerAccountId,
									access_token: account.access_token,
									refresh_token: account.refresh_token,
									expires_at: account.expires_at,
								},
							},
							semesters: { connect: { id: defaultSemester.id } },
						},
					});
				} catch (error) {
					console.error("Error during user database upsert on sign in:", error);
					return false; // Deny sign in.
				}
			}

			return true; // Allow sign in.
		},
	},
});
