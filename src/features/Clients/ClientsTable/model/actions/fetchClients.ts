import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "@/entities/Client";

export async function fetchClients(): Promise<ServerResponse<Client[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/clients`);
  return await response.json();
}
