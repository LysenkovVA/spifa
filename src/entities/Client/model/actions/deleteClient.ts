import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";

export async function deleteClient(
  id: string,
): Promise<ServerResponse<Client>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/clients/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
}
