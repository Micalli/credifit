import { httpClient } from "../httpClient";

export interface RequestLoanParams {
  installmentsNumber: number;
  amount: number;
}
export async function requestLoan({
  installmentsNumber,
  amount,
}: RequestLoanParams) {
  const { data } = await httpClient.post(`/loans`, {
    installmentsNumber,
    amount,
  });

  return data;
}
