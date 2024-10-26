import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export async function checkDBAdminAccess() {
  const session = await auth();

  if (
    !session?.user ||
    !session.user.dbRoles?.find((role) => role === "ADMINISTRATOR")
  ) {
    redirect("/denied");
  }
}
