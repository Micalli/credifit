import { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { localStorageKeys } from "../config/localStorageKeys";
import { userService } from "../services/user";
import type { User } from "../entities/User";

interface AuthContextValue {
  singnedIn: boolean;
  isLoadingUser: boolean;
  user: User | undefined;
  singnin(accessToken: string): void;
  singnout(accessToken?: string): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [singnedIn, setSingnedIn] = useState<boolean>(() => {
    const storeAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storeAccessToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["me"],
    queryFn: () => userService.me(),
    enabled: !!singnedIn
  });

  const singnin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSingnedIn(true);
  }, []);

  const singnout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSingnedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");
      singnout();
    }
  }, [isError, singnout]);

  return (
    <AuthContext.Provider
      value={{
        singnedIn: isSuccess && singnedIn,
        singnin,
        singnout,
        user: data,
        isLoadingUser: isFetching,
      }}
    >
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
