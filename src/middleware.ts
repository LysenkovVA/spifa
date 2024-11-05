import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import { ConsoleColor, ConsoleLog } from "@/shared/lib/consoleLog";

// ДОСТУПНЫЕ МАРШРУТЫ
// ❗️При добавлении маршрутов не забыть добавить их в AppMenu
const dbAdminRoutes = ["/clients", "/clients/"];
const dbUserRoutes = ["/companies", "/companies/"];
const commonPrivateRoutes = ["/profile/"];
const publicRoutes = ["/", "/denied"];

export default async function middleware(req: NextRequest) {
  // Определение маршрута
  const path = req.nextUrl.pathname;
  const isDBAdminRoute = dbAdminRoutes.includes(path);
  const isDBUserRoute = dbUserRoutes.includes(path);
  const isCommonPrivateRoute = commonPrivateRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Если маршрут не публичный
  if (!isPublicRoute) {
    // Получаем сессию
    const session = await auth();

    if (process.env.NODE_ENV === "development") {
      ConsoleLog(
        `[middleware] Проверка прав пользователя ${session?.user.login} PATH=${req.nextUrl.pathname}`,
        ConsoleColor.Purple,
      );
    }

    // Перенаправляем пользователя на страницу авторизации
    if (!session?.user) {
      if (process.env.NODE_ENV === "development") {
        ConsoleLog(
          `[middleware] Пользователь не авторизован`,
          ConsoleColor.Purple,
        );
      }
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (!isCommonPrivateRoute) {
      if (isDBUserRoute) {
        if (session?.user?.dbRoles?.some((role) => role !== "USER")) {
          if (process.env.NODE_ENV === "development") {
            ConsoleLog(
              `[middleware] Пользователь не обладает ролью USER`,
              ConsoleColor.Purple,
            );
          }
          return NextResponse.redirect(new URL("/denied", req.nextUrl));
        }
      }

      if (isDBAdminRoute) {
        if (session?.user?.dbRoles?.some((role) => role !== "ADMINISTRATOR")) {
          if (process.env.NODE_ENV === "development") {
            ConsoleLog(
              `[middleware] Пользователь не обладает ролью ADMINISTRATOR`,
              ConsoleColor.Purple,
            );
          }
          return NextResponse.redirect(new URL("/denied", req.nextUrl));
        }
      }
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png|favicon.ico$).*)",
    "/denied",
    "/",
  ],
};
