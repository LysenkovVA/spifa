"use server";
import { signIn } from "../../../../auth";
import { User } from "@/entities/User";

export async function loginAction(user: User) {
  try {
    await signIn("credentials", {
      ...user,
      redirect: false,
    });
  } catch (error) {
    console.log("ERROR at loginAction", JSON.stringify(error, null, 2));
  }
}
