import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { AxiosError } from "axios";
import { isValidCPF } from "../../utils/isValidCPF";
import { companyService } from "../../app/services/company";
import type { addWorkerParams } from "../../app/services/company/addWorker";
import { useAuth } from "../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email("Informe um e-mail válido").nonempty("E=mail é obrigatório"),

  cpf: z.string().refine((cpf) => isValidCPF(cpf), {
    message: "CPF inválido",
  }),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 digitos"),

  salary: z.string().nonempty("O salário é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useAddWorkerController() {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const {
    handleSubmit: hookFormSubmit,
    reset,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: addWorkerParams) => {
      return companyService.addWorker(data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log("🚀 ~ useAddWorkerController11 ~ error:", error);
      const message =
        error.response?.data?.message || // 👈 mensagem vinda do backend
        error.message || // erro de rede / axios
        "Não foi possível criar conta";
      toast.error(message);
    },
  });

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
    console.log("🚀 ~ useAddWorkerController ~ data:", data);
    try {
      await mutateAsync({ ...data, companyId: user?.companyId });
      toast.success("Funcionario adicionado");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["workers", user?.companyId],
      });
    } catch (error) {
      console.log("🚀 ~ useAddWorkerController ~ error:", error);
    }
  });

  return { register, errors, handleSubmit, isPending };
}
