import { auth } from "@/authentication";

export default async function IndividualLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	const isAdmin = session?.user?.role === "ADMIN";

	if (isAdmin) {
		return <>{children}</>;
	}

	return <div>You do not have access to this page.</div>;
}
