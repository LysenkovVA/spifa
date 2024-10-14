import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";

export async function createCompany(
  company: Company,
): Promise<ServerResponse<Company>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/companies/create`,
    {
      method: "POST",
      body: JSON.stringify(company),
    },
  );

  return await response.json();
}
