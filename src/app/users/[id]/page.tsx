import { redirect } from "next/navigation";

interface UserProps {
	params: Promise<{ id: string }>;
}

export default async function User({ params }: UserProps) {
	const { id } = await params;
	redirect(`/users?profileUserId=${id}`);
}
