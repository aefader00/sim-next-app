import { redirect } from "next/navigation";

export default async function AddUser() {
	redirect("/users?addUser=1");
}
