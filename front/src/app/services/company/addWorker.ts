import { parseBRL } from '../../../utils/parseBRL';
import { httpClient } from "../httpClient";

export interface addWorkerParams {
  cpf: string;
  email: string;
  name: string;
  password: string;
  companyId: string | undefined;
  salary: string;
}
export async function addWorker({
  companyId,
  cpf,
  email,
  name,
  salary,
  password,
}: addWorkerParams) {
  const { data } = await httpClient.post(`/auth/signup/employee`, {
    name,
    cpf: cpf.replace(/\D/g, ""),
    email,
    password,
    salary: parseBRL(salary),
    companyId,
  });

  return data;
}
