import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { User } from "@/entities/User";

export async function fetchUserById(id: string): Promise<ServerResponse<User>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/${id}`,
  );
  return await response.json();
}
