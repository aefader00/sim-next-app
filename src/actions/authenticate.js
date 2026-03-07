"use server";

import { signIn, signOut } from "@/authentication";

export async function logIn() {
	await signIn("google");
}

export async function logOut() {
	await signOut();
}
