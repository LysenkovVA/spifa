import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "@/entities/Company";

export async function fetchCompanies(): Promise<ServerResponse<Company[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/companies`);
  return await response.json();
}
