import { Button } from "../../components/ui/Button";
import { Header } from "../../components/ui/Header";
import FaceIcon from "../../assets/betina-sorrindo.png";
import { Slider } from "../../components/ui/Slider";
import { useLoanController } from "./useLoanController";
import { useAuth } from "../../app/hooks/useAuth";
import { ChevronLeft } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { LoanList } from "../../components/LoanList";

export function Loan() {
  const {
    step,
    previouslyStep,
    nextStep,
    installmentSelected,
    handleChangeInstallmentNumber,
    handleChangeLoanAmount,
    loanAmount,
    handleSubmitLoan,
    isPending,
  } = useLoanController();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col mx-auto my-8 ">
        <div className="mt-20 mb-8 flex  items-center gap-2  text-left">
          <ChevronLeft
            onClick={() => window.history.back()}
            className="w-8 h-8 hover:bg-gray-300/50 rounded-full cursor-pointer p-1"
          />
          <div>
            <p className=" text-xs text-gray-500">
              Home / <span className="text-gray-700">Crédito Consignado</span>
            </p>
            <h1 className="text-3xl font-semibold text-primary  ">
              Crédito Consignado
            </h1>
          </div>
        </div>

        <div className=" bg-white  rounded-lg max-w-[536px] w-full py-8 px-12 shadow-2xl ">
          <div className=" flex flex-col  text-xl text-primary font-bold mb-4">
            Simular Empréstimo
          </div>
          <div className="bg-[#FFE5D5] flex items-start rounded-2xl p-4 gap-2">
            <img src={FaceIcon} />
            <span>
              {step === 1 &&
                `Você possui saldo para Crédito Consignado pela empresa ${user?.companyName}. Faça uma simulação! Digite quanto você precisa:`}
              {step === 2 &&
                "Escolha a opção de parcelamento que melhor funcionar para você:"}
              {step === 3 &&
                "Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua Conta Credifit! Veja o resumo da simulação!"}
              {step === 4 &&
                "Você solicitou seu empréstimo! Agora aguarde as etapas de análises serem concluídas!"}
            </span>
          </div>
          {user && (
            <div className="mt-10">
              <Slider
                initialValue={1000}
                maxValue={user?.salary * 0.35}
                hiddenSlider={step >= 2}
                hiddenValue={step >= 3}
                onChange={handleChangeLoanAmount}
              />
            </div>
          )}

          {step === 2 && (
            <div className="text-gray-600 mt-4">
              <div className="mb-4">Divididas em:</div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 text-gray-600 text-base ">
                <div
                  className={`  rounded-lg py-4 px-8 shadow-lg border-l-6 border-amber-500   cursor-pointer ${
                    installmentSelected === 1
                      ? "bg-[#FFD899]"
                      : " bg-white hover:bg-gray-100 "
                  }`}
                  onClick={() => handleChangeInstallmentNumber(1)}
                >
                  1x de{" "}
                  <span className="text-primary font-bold">
                    {formatCurrency(loanAmount / 1)}
                  </span>
                </div>
                <div
                  className={`  rounded-lg py-4 px-8 shadow-lg border-l-6 border-amber-500   cursor-pointer ${
                    installmentSelected === 2
                      ? "bg-[#FFD899]"
                      : " bg-white hover:bg-gray-100 "
                  }`}
                  onClick={() => handleChangeInstallmentNumber(2)}
                >
                  2x de{" "}
                  <span className="text-primary font-bold">
                    {formatCurrency(loanAmount / 2)}
                  </span>
                </div>
                <div
                  className={`  rounded-lg py-4 px-8 shadow-lg border-l-6 border-amber-500   cursor-pointer ${
                    installmentSelected === 3
                      ? "bg-[#FFD899]"
                      : " bg-white hover:bg-gray-100 "
                  }`}
                  onClick={() => handleChangeInstallmentNumber(3)}
                >
                  3x de{" "}
                  <span className="text-primary font-bold">
                    {formatCurrency(loanAmount / 3)}
                  </span>
                </div>
                <div
                  className={`  rounded-lg py-4 px-8 shadow-lg border-l-6 border-amber-500   cursor-pointer ${
                    installmentSelected === 4
                      ? "bg-[#FFD899]"
                      : " bg-white hover:bg-gray-100 "
                  }`}
                  onClick={() => handleChangeInstallmentNumber(4)}
                >
                  4x de{" "}
                  <span className="text-primary font-bold">
                    {formatCurrency(loanAmount / 4)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="mt-6 flex justify-between">
                <div>
                  <h1>Valor a Creditar</h1>
                  <span className="text-gray-600">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <div>
                  <h1>Valor a financiar</h1>
                  <span className="text-gray-600">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h1>Parcelamento</h1>
                <span className="text-gray-600">
                  {installmentSelected} X{" "}
                  {formatCurrency(loanAmount / installmentSelected)}
                </span>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <LoanList />
            </>
          )}

          <div className="flex gap-4 mt-6">
            <Button
              variant="ghost"
              onClick={previouslyStep}
              disabled={step === 1}
            >
              {step !== 4 && "Voltar"}

              {step === 4 && "Inicio"}
            </Button>

            {step !== 3 && (
              <Button
                onClick={step === 3 ? handleSubmitLoan : nextStep}
                disabled={step === 2 && !installmentSelected}
              >
                {step === 1 && "Simular Empréstimo"}
                {step === 2 && "Seguinte"}
                {step === 4 && "Novo Empréstimo"}
              </Button>
            )}

            {step === 3 && (
              <Button onClick={handleSubmitLoan} disabled={isPending}>
                Solicitar Empréstimo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
