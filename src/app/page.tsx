import { LoginForm } from "@/features/Auth/LoginForm";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { DEFAULT_ROUTE } from "@/widgets/AppMenu/hooks/useMenuItems";

export default async function LoginPage() {
  // Получаем сессию
  const session = await auth();
  // Если пользователь авторизован, перенаправляем в приложение,
  // иначе на авторизацию
  if (session && session.user) {
    if (session.user.dbRoles?.find((role) => role === "ADMINISTRATOR")) {
      redirect("/clients");
    }

    if (session.user.dbRoles?.find((role) => role === "USER")) {
      redirect(DEFAULT_ROUTE);
    }
  } else {
    return <LoginForm />;
  }
}
