import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { EditableProfileCard } from "@/features/Profiles/EditableProfileCard";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/denied");
  }

  return <EditableProfileCard />;
}
