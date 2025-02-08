"use client";
import { LogIn } from "../actions";
import Button from "./button";

export default function LoginButton() {
	return <Button value="Sign in with your MassArt account ✨" onClick={LogIn} />;
}
