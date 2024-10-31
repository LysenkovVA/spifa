import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";

/**
 * @deprecated
 * @param client
 */
export async function updateClient(
  client: Client,
): Promise<ServerResponse<Client>> {
  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_API_PATH}/clients/${client.id}`,
    `${process.env.NEXT_PUBLIC_API_PATH}/clients/upsert`,
    {
      // method: "PATCH",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    },
  );

  return await response.json();
}
