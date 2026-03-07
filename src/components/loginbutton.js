"use client";
import { LogIn } from "../actions";
import Button from "./ui/Button";

export default function LoginButton() {
	return <Button onClick={LogIn}>Sign in with your MassArt account ✨</Button>;
}
