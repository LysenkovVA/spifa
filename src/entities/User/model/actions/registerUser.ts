import { User } from "@/entities/User";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";

export async function registerUser(user: User): Promise<ServerResponse<User>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(user),
    },
  );

  return await response.json();
}
