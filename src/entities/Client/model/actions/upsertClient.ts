import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";

/**
 * @param client
 */
export async function upsertClient(
  client: Client,
): Promise<ServerResponse<Client>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/clients/upsert`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    },
  );

  return (await response.json()) as ServerResponse<Client>;
}
