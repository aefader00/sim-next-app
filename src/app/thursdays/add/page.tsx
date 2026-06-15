import { redirect } from "next/navigation";

export default async function AddThursday() {
	redirect("/thursdays?addThursday=1");
}
