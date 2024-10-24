import { ServerResponse } from "@/shared/lib/responses/ServerResponse";
import { DaDataCompanyResponse } from "@/entities/Company";

export async function findCompanyByNameAction(
  query: string,
): Promise<ServerResponse<DaDataCompanyResponse | undefined>> {
  try {
    const url = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party`;
    // const token = process.env.DADATA_API_KEY;
    const token = "4d169ee39b423f851c1b5d057ce4ffac36a055f6";
    //
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },

      body: JSON.stringify({ query: query }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return ServerResponse.Ok<DaDataCompanyResponse>(data);
  } catch (error: any) {
    return ServerResponse.ServerError(error);
  }
}
