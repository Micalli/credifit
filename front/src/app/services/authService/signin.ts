import { httpClient } from "../httpClient";
export interface SigninParams {
  email: string;
  password: string;
  loginMode: "company" | "employee";
}

export async function signin({ email, password, loginMode }: SigninParams) {
  if (loginMode === "company") {
    const { data } = await httpClient.post("/auth/signin/company", {
      email,
      password,
    });
    return data;
  }
  if (loginMode === "employee") {
    const { data } = await httpClient.post("/auth/signin/employee", {
      email,
      password,
    });
    return data;
  }
}
