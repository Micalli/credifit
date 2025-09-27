import { useQuery } from "@tanstack/react-query";
import { loanService } from '../services/loan';

export function useLoansByUserId() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["loans"],
    queryFn: () => loanService.getById(),
  });

  return { loans: data, isLoading: isFetching, isError };
}
