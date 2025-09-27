import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Header } from "../../components/ui/Header";
import { BadgeStatus } from '../../components/BadgeStatus';
import { formatCurrency } from '../../utils/formatCurrency';
import { useAuth } from '../../app/hooks/useAuth';

export function WorkerHome() {
  const {user} = useAuth()
  // Lista mockada de funcionários
  const loan = [
    {
      id: 1,
      name: "Jkflçs564ad",
      status: "pending",
      installments: 2,
      totalFinanced: 10000,
    },
    {
      id: 2,
      name: "fsljsddf",
      status: "approved",
      installments: 2,
      totalFinanced: 10000,
    },
    {
      id: 3,
      name: "x3hs86as5",
      status: "rejected",
      installments: 2,
      totalFinanced: 10000,
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center ">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">{user?.companyName}</h1>
            <span className="text-gray-600 text-sm">Bem-vindo</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">Lista de empréstimos</h2>
            <Button className="w-fit" onClick={() => navigate("/loan")}>
               + Crédito Consignado
            </Button>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow-2xl">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Solicitação
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Total Financiado
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Numero de parcelas
                  </th>
                  {/* <th className="px-6 py-3 border-b"></th> */}
                </tr>
              </thead>
              <tbody>
                {loan.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800 border-b">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-b">
                      <BadgeStatus status={emp.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-b">
                      {formatCurrency(emp.totalFinanced)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-b">
                      {emp.installments}
                    </td>
                    {/* <td className="px-6 py-4 border-b text-right">
                    <Button variant="ghost" >
                      Editar
                    </Button>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
