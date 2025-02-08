import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

import { getAllSemesters } from "@/actions";
const semesters = await getAllSemesters();

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Google],
	callbacks: {
		async signIn({ user, account, profile }) {
			// Add a check for account being non-null
			if (!account) {
				console.error("Account is null or undefined");
				return false; // Prevent further execution if account is invalid
			}

			const email = user.email as string;
			const name = user.name as string;
			const image = user.image as string;
			const username = user.email as string;

			try {
				// If a
				await prisma.user.upsert({
					where: {
						// Check if the user already exists by email.
						email: email,
					},
					update: {
						// If the user exists, update their data.
						// We don't have a purpose for this functionality right now, but theoretically we could update data everytime a user logs in here.
					},
					create: {
						// If the user doesn't exist, add them to our database.
						id: user.id,
						email: email,
						name: name,
						image: image.replace("s96-c", "s384-c"),
						username: username?.split("@")[0],
						about: "Hi, I'm new to SIM!",
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
						semesters: { connect: { id: semesters[0].id } },
					},
				});
			} catch (error) {
				console.error("Error during user database upsert on sign in:", error);
				return false; // Deny sign in.
			}

			return true; // Allow sign in.
		},
	},
});
