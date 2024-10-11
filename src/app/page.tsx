import { LoginForm } from "@/features/Auth/LoginForm";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Получаем сессию
  const session = await auth();
  // Если пользователь авторизован, перенаправляем в приложение,
  // иначе на авторизацию
  if (session && session.user) {
    redirect("/payments");
  } else {
    return <LoginForm />;
  }
}
