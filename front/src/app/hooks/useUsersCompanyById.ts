import { useQuery } from "@tanstack/react-query";
import { companyService } from "../services/company";

export function useUsersCompanyById(companyId: string | undefined) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["workers", companyId],
    queryFn: () => companyService.findCompanyWorkers(companyId),
    enabled: !!companyId,
  });

  return { usersCompany: data, isLoading: isFetching, isError };
}
