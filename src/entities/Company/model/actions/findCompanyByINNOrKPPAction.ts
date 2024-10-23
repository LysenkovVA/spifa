export async function findCompanyByINNOrKPPAction(query: string): Promise<any> {
  const url =
    "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
  const token = process.env.DADATA_API_KEY;
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

  return await response.json();
}
