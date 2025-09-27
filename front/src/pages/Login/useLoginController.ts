import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from '../../app/services/authService';
import { useAuth } from '../../app/hooks/useAuth';
import type { SigninParams } from '../../app/services/authService/signin';
import { useState } from 'react';

const schema = z.object({
  email: z.email("Informe um e-mail válido").nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
    const [loginMode, setLoginMode] = useState<"employee" | "company">(
      "employee"
    );

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { singnin } = useAuth();
  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync({...data, loginMode});
      singnin(accessToken);
    } catch (error) {
      console.log("🚀 ~ useLoginController ~ error:", error);
      toast.error("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isPending, loginMode, setLoginMode };
}
