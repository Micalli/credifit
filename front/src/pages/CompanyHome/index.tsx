import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Header } from "../../components/ui/Header";
import { useCompanyHomeController } from "./useCompanyHomeController";
import { formatCurrency } from "../../utils/formatCurrency";
import { Spinner } from "../../components/ui/Spinner";

export function CompanyHome() {
  const { usersCompany, isLoading } = useCompanyHomeController();
  console.log("🚀 ~ CompanyHome ~ usersCompany:", usersCompany);
  // Lista mockada de funcionários

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center ">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">
              {usersCompany?.companyName || "Minha empresa"}
            </h1>
            <span className="text-gray-600 text-sm">Bem-vindo</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">Lista de funcionários</h2>
            <Button className="w-fit" onClick={() => navigate("/add-worker")}>
              + Adicionar funcionário
            </Button>
          </div>
          {usersCompany && !isLoading && (
            <div className="overflow-x-auto bg-white rounded-lg shadow-2xl">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      CPF
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Salário
                    </th>
                    {/* <th className="px-6 py-3 border-b"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {usersCompany.users.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {emp.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {emp.cpf}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b">
                        {formatCurrency(emp.salary)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isLoading && (
            <div className=" flex justify-center">
              <Spinner classname="w-10 h-10" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
