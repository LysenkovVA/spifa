import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { Company } from "../types/Company";

export async function fetchCompanyById(
  id: string,
): Promise<ServerResponse<Company>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/companies/${id}`,
  );
  return await response.json();
}
