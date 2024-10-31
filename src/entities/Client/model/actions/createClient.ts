import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";

/**
 * @deprecated
 * @param client
 */
export async function createClient(
  client: Client,
): Promise<ServerResponse<Client>> {
  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_API_PATH}/clients/create`,
    `${process.env.NEXT_PUBLIC_API_PATH}/clients/upsert`,
    {
      method: "POST",
      body: JSON.stringify(client),
    },
  );

  return await response.json();
}
