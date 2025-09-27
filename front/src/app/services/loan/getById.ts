import { httpClient } from "../httpClient";
interface LoansResponse {
  id: string;
  userId: string;
  amount: number;
  status: "approved" | "denied" | "pending";
  companyName: string;
  nextDueDate: string;
  installmentNumber: number;
  requestedAt: string;
}

export async function getById() {
  const { data } = await httpClient.get<LoansResponse[]>(`/loans`);

  return data;
}
