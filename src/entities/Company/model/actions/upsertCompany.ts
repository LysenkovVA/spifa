import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";

/**
 * @param company
 */
export async function upsertCompany(
  company: Company,
): Promise<ServerResponse<Company>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/companies/upsert`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    },
  );

  return (await response.json()) as ServerResponse<Company>;
}
