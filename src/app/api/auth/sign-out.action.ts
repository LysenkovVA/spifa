import { signOut } from "next-auth/react";

export async function signOutAction() {
  console.log("SIGN OUT...");
  await signOut({ redirectTo: "/" });
}
