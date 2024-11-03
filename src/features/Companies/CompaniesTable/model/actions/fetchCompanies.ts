import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "@/entities/Company";

export async function fetchCompanies(
  take?: number,
  skip?: number,
): Promise<ServerResponse<Company[]>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/companies`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ take, skip }),
    },
  );
  return await response.json();
}
