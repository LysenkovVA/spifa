import { EditableProfileCard } from "@/features/Profiles/EditableProfileCard";
import { auth } from "../../../../../auth";
import { fetchUserById } from "@/entities/User/model/actions/fetchUserById";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  params: { id: string };
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await auth();
  const profile = await fetchUserById(params.id);

  // Если запрашиваемый профиль пользователя не соответствует клиенту текущего пользователя
  // или пользователь не администратор БД
  // т.е. пользователь другого клиента хочет посмотреть профиль
  if (
    session?.user?.dbRoles?.some((role) => role !== "ADMINISTRATOR") &&
    session?.user?.clients?.[0]?.client?.id !==
      profile.data.clients?.[0]?.client?.id
  ) {
    // Доступ запрещен
    redirect("/denied");
  }

  return (
    <EditableProfileCard
      profile={profile.data}
      isMyProfile={session?.user?.id === params.id}
    />
  );
}
