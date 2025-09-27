import { httpClient } from "../httpClient";

export async function getById() {
  const { data } = await httpClient.get(`/loans`);

  return data;
}
