import { ChevronDown, User } from "lucide-react";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../app/hooks/useAuth";
import { CustomDropdown } from './DropdownMenu';

export function Header() {
  const { user, singnout } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 bg-primary z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-extrabold tracking-wide mb-3 sm:mb-0">
              <img src={Logo} alt="Logo" height={120} width={120} />
            </div>
          </div>
          {user && (
            <div className="text-white flex items-center gap-2">
              {/* Ícone User */}
              <User className="w-5 h-5" />

              {/* Nome + Subtexto */}
              <div className="flex flex-col leading-tight">
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs text-gray-300">
                  {user.role === "worker" && "Funcionário"}{" "}
                  {user.role === "companyRepresent" && "Empresa"}
                </span>
              </div>

              {/* Chevron */}
              <div>
                <CustomDropdown
                  trigger={<ChevronDown className="w-6 h-6 " />}
                  triggerLabel="Options"
                  options={[
                    {
                      label: "Sair",
                      onClick: () => singnout(),
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
