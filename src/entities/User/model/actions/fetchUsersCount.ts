import { ServerResponse } from "@/shared/lib/responses/ServerResponse";

export async function fetchUsersCount(): Promise<ServerResponse<number>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/count`,
    {
      method: "GET",
    },
  );

  return await response.json();
}
