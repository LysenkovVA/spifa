import { User } from "@/entities/User";
import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { serialize } from "object-to-formdata";

export async function updateUser(user: User): Promise<ServerResponse<User>> {
  const formData = serialize(user);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/update`,
    {
      method: "POST",
      body: formData,
    },
  );

  return await response.json();
}
