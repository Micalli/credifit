import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  cpf: string;
  email: string;
  password: string;
  cnpj: string;
  companyName: string;
  arrangement: boolean;
}

export async function signup({
  arrangement,
  cnpj,
  companyName,
  cpf,
  email,
  name,
  password,
}: SignupParams) {
  const { data } = await httpClient.post("/auth/signup/company", {
    name,
    cpf: cpf.replace(/\D/g, ""),
    email,
    password,
    cnpj: cnpj.replace(/\D/g, ""),
    companyName,
    arrangement,
  });

  return data;
}
