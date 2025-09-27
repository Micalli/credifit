import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loanService } from "../../app/services/loan";
import type { RequestLoanParams } from "../../app/services/loan/create";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useLoanController() {
  const [installmentSelected, setInstallmentSelected] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState(1000);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RequestLoanParams) => {
      return loanService.requestLoan(data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log("🚀 ~ useAddWorkerController11 ~ error:", error);
      const message =
        error.response?.data?.message || // 👈 mensagem vinda do backend
        error.message || // erro de rede / axios
        "Não foi possível criar conta";
      console.log("🚀 ~ useAddWorkerController ~ message:", message);
      toast.error(message);
    },
  });

  const [step, setStep] = useState(1);
  function nextStep() {
    setStep((prevState) => prevState + 1);
  }

  function previouslyStep() {
    setStep((prevState) => prevState - 1);
  }

  function handleChangeInstallmentNumber(installment: number) {
    setInstallmentSelected(installment);
  }

  function handleChangeLoanAmount(amount: number) {
    setLoanAmount(amount);
  }

  async function handleSubmitLoan() {
    try {
      await mutateAsync({
        amount: loanAmount,
        installmentsNumber: installmentSelected,
      });

      nextStep()

    } catch (error) {
      console.log("🚀 ~ handleSubmitLoan ~ error:", error);
    }
  }
  return {
    loanAmount,
    installmentSelected,
    step,
    previouslyStep,
    nextStep,
    handleChangeInstallmentNumber,
    handleChangeLoanAmount,
    handleSubmitLoan,
    isPending,
  };
}
