import LinkButton from "./linkbutton";

import { isCurrentUserAdmin } from "../actions";

export default async function EditContentButton({ href }) {
	if (await isCurrentUserAdmin()) {
		return <LinkButton style={{ padding: "0.25rem", marginTop: "0rem", marginBottom: "0rem" }} value={"✏️"} href={href} />;
	}
}
