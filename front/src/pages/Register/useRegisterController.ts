import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { AxiosError } from "axios";
import { useAuth } from "../../app/hooks/useAuth";
import { isValidCNPJ } from "../../utils/isValidCNPJ";
import { isValidCPF } from '../../utils/isValidCPF';
import type { SignupParams } from '../../app/services/authService/signup';
import { authService } from '../../app/services/authService';

const schema = z
  .object({
    companyName: z.string().nonempty("Nome é obrigatório"),
    email: z.email("Informe um e-mail válido").nonempty("E=mail é obrigatório"),
    cnpj: z
      .string()
      .nonempty("Senha é obrigatória")
      .refine((cnpj) => isValidCNPJ(cnpj), {
        message: "CNPJ inválido",
      }),
    name: z
      .string()
      .nonempty("Nome é obrigatório"),
    cpf: z.string().refine((cpf) => isValidCPF(cpf), {
      message: "CPF inválido",
    }),
    password: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(8, "Senha deve conter pelo menos 8 digitos"),
    confirmPassword: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(8, "Senha deve conter pelo menos 8 digitos"),
         arrangement: z
      .boolean()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"], // marca o erro no campo de confirmação
  });
  

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
    console.log("🚀 ~ useRegisterController ~ formState:", errors);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message =
        error.response?.data?.error || // 👈 mensagem vinda do backend
        error.message || // erro de rede / axios
        "Não foi possível criar conta";
      toast.error(message);
    },
  });

  const { singnin } = useAuth();

  const cpf = watch("cpf");

  useEffect(() => {
    const digits = cpf?.replace(/\D/g, "");
    if (digits?.length === 11) {
      if (!isValidCPF(cpf)) {
        setError("cpf", { message: "CPF inválido" });
      } else {
        clearErrors("cpf");
      }
    } else {
      clearErrors("cpf");
    }
  }, [cpf]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log("🚀 ~ useRegisterController ~ data:", data)
      const { accessToken } = await mutateAsync(data);

      singnin(accessToken);

      toast.success("Conta criada com sucesso!");
    } catch (error) {
      console.log("🚀 ~ useRegisterController ~ error:", error);
      // toast.error("Ocorreu um erro ao criar a sua conta!");
    }
  });

  return { register, errors, handleSubmit, isPending, control };
}
