import { useAuth } from "../../app/hooks/useAuth";
import { CompanyHome } from '../CompanyHome';
import { WorkerHome } from '../Worker';

export function Home() {
  const {user} = useAuth();

  return (
    <div>
      {user?.role === "worker" && <WorkerHome />}
      {user?.role === "companyRepresent" && <CompanyHome />}
    </div>
  );
}
