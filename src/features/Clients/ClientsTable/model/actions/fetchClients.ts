import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "@/entities/Client";

export async function fetchClients(
  take?: number,
  skip?: number,
): Promise<ServerResponse<Client[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ take, skip }),
  });
  return await response.json();
}
