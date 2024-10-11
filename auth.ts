import NextAuth from "next-auth";
import { authConfig } from "@/shared/config/auth-js/authConfig";

// signIn, signOut, auth ???
export const { handlers, signIn, auth } = NextAuth({
  ...authConfig,
});
