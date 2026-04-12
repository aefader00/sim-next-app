import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),

	pages: {
		signIn: "/login",
		error: "/welcome",
	},

	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
			authorization: {
				params: {
					scope: "openid email profile",
				},
			},
		}),
	],

	callbacks: {
		async signIn({ user, account }) {
			if (!account || !user?.email) {
				return false;
			}

			const existingUser = await prisma.user.findUnique({
				where: { email: user.email },
				select: { id: true },
			});

			if (!existingUser) {
				return "/";
			}

			return true;
		},

		async jwt({ token }) {
			if (!token.email) return token;

			const dbUser = await prisma.user.findUnique({
				where: { email: token.email },
				select: {
					id: true,
					admin: true,
				},
			});

			if (dbUser) {
				token.id = dbUser.id;
				token.admin = dbUser.admin;
			}

			return token;
		},

		async session({ session, token }) {
			if (!session?.user) return session;

			if (token?.email) {
				const dbUser = await prisma.user.findUnique({
					where: { email: token.email },
					select: { id: true, admin: true },
				});

				if (dbUser) {
					session.user.id = dbUser.id;
					session.user.admin = dbUser.admin;
				}
			}

			return session;
		},
	},
});
