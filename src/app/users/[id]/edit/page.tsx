import { redirect } from "next/navigation";

interface EditUserProps {
  params: Promise<{ id: string }>;
}

export default async function EditUser({ params }: EditUserProps) {
  const { id } = await params;

  redirect(`/users?editUserId=${id}`);
}
