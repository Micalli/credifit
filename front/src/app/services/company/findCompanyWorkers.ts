import { httpClient } from '../httpClient';

export async function findCompanyWorkers(companyId: string | undefined) {
  const { data } = await httpClient.get(`/companies/workers/${companyId}`);

  return data;
}