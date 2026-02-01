import { isCurrentUserAdmin } from "../../actions";

export default async function AdminLayout({ children }) {
	if (await isCurrentUserAdmin()) {
		return <div>{children}</div>;
	} else {
		return <div>You do not have access to this page.</div>;
	}
}
