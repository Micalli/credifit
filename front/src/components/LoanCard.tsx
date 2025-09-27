import { useState } from "react";
import { ChevronDown, ChevronUp, ClockFading, Eye, EyeOff } from "lucide-react";
import { Hourglass } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

interface LoanCardProps {
  title: string;
  status: "approved" | "denied" | "pending";
  company: string;
  dueDate: string;
  totalFinanced: number;
  installmentValue: number;
  installments: number;
}

const statusConfig = {
  approved: {
    label: "Crédito aprovado",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    icon: <CircleCheckBig className="text-green-700" />,
  },
  denied: {
    label: "Reprovado por score",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
    icon: <ClockFading className="text-orange-700" />,
  },
  pending: {
    label: "Em análise",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    icon: <Hourglass className="text-blue-700" />,
  },
};

export function LoanCard({
  title,
  status,
  company,
  dueDate,
  totalFinanced,
  installmentValue,
  installments,
}: LoanCardProps) {
  console.log("🚀 ~ LoanCard ~ installmentValue:", installmentValue)
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const currentStatus = statusConfig[status];


  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto mb-4">
      {/* Cabeçalho do Card */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          {status === "approved" && (
            <CircleCheckBig className="text-green-500 text-xl" />
          )}
          {status === "denied" && <ClockFading className="text-orange-700" />}
          {status === "pending" && <Hourglass className="text-blue-700" />}
          <h2 className="font-semibold text-gray-700">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-500" />
        ) : (
          <ChevronDown className="text-gray-500" />
        )}
      </div>

      {/* Corpo do Card (expansível) */}
      {isOpen && (
        <div className="mt-4 pl-8">
          {/* Tag de Status */}
          {currentStatus && (
            <div className="flex justify-between items-center mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bgColor} ${currentStatus.textColor}`}
              >
                {currentStatus.icon}
                <span className="ml-2">{currentStatus.label}</span>
              </span>
              <button
                onClick={() => setIsHidden(!isHidden)}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                {isHidden ? (
                  <EyeOff className="mr-1" />
                ) : (
                  <Eye className="mr-1" />
                )}
                {isHidden ? "Mostrar" : "Ocultar"}
              </button>
            </div>
          )}

          {/* Detalhes do Empréstimo */}
          <div className={`transition-opacity duration-300 `}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
              <div>
                <p className="text-gray-500">Empresa</p>
                <p className="font-medium text-gray-800">{company}</p>
              </div>
              <div>
                <p className="text-gray-500">Próximo Vencimento</p>
                <p className="font-medium text-gray-800">
                  {formatDate(dueDate)}
                </p>
              </div>
              {totalFinanced && (
                <div>
                  <p className="text-gray-500">Total Financiado</p>
                  <p className="font-medium text-gray-800">
                    {isHidden ? "********" : formatCurrency(totalFinanced)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Valor da Parcela</p>
                <p className="font-medium text-gray-800">
                  {isHidden ? "********" : formatCurrency(installmentValue)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Número de parcelas</p>
                <p className="font-medium text-gray-800">{installments} x</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
