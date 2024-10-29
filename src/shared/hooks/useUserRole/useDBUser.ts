"use client";

import { useSession } from "next-auth/react";

/**
 * Получает пользователя
 */
export const useDBUser = () => {
  const session = useSession();

  const user = session.data?.user;
  const isDBAdmin =
    session.data?.user?.dbRoles?.some((role) => role === "ADMINISTRATOR") ??
    false;
  const isDBUser =
    session.data?.user?.dbRoles?.some((role) => role === "USER") ?? false;

  return [user, isDBAdmin, isDBUser];
};
