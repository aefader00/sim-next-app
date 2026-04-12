import { auth } from "@/authentication";

export default async function AdminLayout({ children }) {
	const session = await auth();
	const isAdmin = session?.user?.admin ?? false;

	if (isAdmin) {
		return <div>{children}</div>;
	} else {
		return <div>You do not have access to this page.</div>;
	}
}
