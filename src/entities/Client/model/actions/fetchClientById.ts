import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Client } from "../types/Client";

export async function fetchClientById(
  id: string,
): Promise<ServerResponse<Client>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/clients/${id}`,
  );
  return await response.json();
}
