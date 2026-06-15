import { redirect } from "next/navigation";

export default async function AddSemester() {
	redirect("/semester?addSemester=1");
}
