import { useAuth } from '../../app/hooks/useAuth';
import { useUsersCompanyById } from '../../app/hooks/useUsersCompanyById'

export function useCompanyHomeController() {
    const { user } = useAuth();

    const { usersCompany, isLoading } = useUsersCompanyById(user?.companyId);
    
    return { usersCompany, isLoading };
}