import { useLoansByUserId } from "../app/hooks/useLoansByUserId";
import { LoanCard } from "./LoanCard";

export function LoanList() {
  const { loans } = useLoansByUserId();

  return (
    <>
      {loans &&
        loans.map((loan) => (
          <LoanCard
            title={`SOLICITAÇÃO DE EMPRÉSTIMO ${loan.id.slice(0, 3)}...`}
            status={loan.status}
            totalFinanced={loan.amount}
            company={loan.companyName}
            dueDate={loan.nextDueDate}
            installmentValue={Number(loan.amount) / loan.installmentNumber}
            installments={loan.installmentNumber}
          />
        ))}
    </>
  );
}
