import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";

export async function deleteCompany(
  id: string,
): Promise<ServerResponse<Company>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/companies/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
}
