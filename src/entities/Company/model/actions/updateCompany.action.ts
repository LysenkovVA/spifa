import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";

export async function updateCompany(
  company: Company,
): Promise<ServerResponse<Company>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/companies/${company.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    },
  );

  return await response.json();
}
