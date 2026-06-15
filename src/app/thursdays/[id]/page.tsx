import { redirect } from "next/navigation";

interface ThursdayProps {
	params: Promise<{ id: string }>;
}

export default async function Thursday({ params }: ThursdayProps) {
	const { id } = await params;
	redirect(`/thursdays?thursdayId=${id}`);
}
