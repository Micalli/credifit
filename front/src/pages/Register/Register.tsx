import { Controller } from 'react-hook-form';
import { Button } from "../../components/ui/Button";
import { CheckBox } from '../../components/ui/CheckBox';
import { Header } from "../../components/ui/Header";
import { Input } from "../../components/ui/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, isPending, register, control,errors } =
    useRegisterController();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fixo no topo */}
      <Header />

      {/* Container centralizado */}
      <div className="flex flex-1 justify-center items-center p-16 mt-5">
        <div className="bg-white rounded-lg max-w-2xl w-full py-8 px-12 shadow-2xl">
          <div className="flex flex-col items-center text-xl">
            Cadastro
            <span className="text-gray-500 font-light text-sm">
              Crie sua conta
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label>Nome da empresa</label>
            <Input
              placeholder="CREDIFIT LTDA"
              {...register("companyName")}
              error={errors.companyName?.message}
            />
            <label>Email</label>
            <Input
              type="email"
              placeholder="bruno@credifit.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <label>CNPJ</label>
            <Input
              placeholder="Seu CNPJ"
              mask="cnpj"
              {...register("cnpj")}
              error={errors.cnpj?.message}
            />
            <label>Nome do Represente</label>
            <Input
              placeholder="Seu nome "
              {...register("name")}
              error={errors.name?.message}
            />
            <label>CPF</label>
            <Input
              placeholder="Seu CPF"
              mask="cpf"
              {...register("cpf")}
              error={errors.cpf?.message}
            />
            <label>Senha</label>
            <Input
              type="password"
              placeholder="Sua senha"
              {...register("password")}
              error={errors.password?.message}
            />
            <label>Confirme sua senha</label>
            <Input
              type="password"
              placeholder="Sua senha"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Controller
              name="arrangement"
              control={control}
              render={({ field }) => (
                <CheckBox
                  label="Empresa conveniada"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Button isLoading={isPending} className="mt-10" type="submit">
              Cadastrar
            </Button>
            <div className="mt-6 text-center">
              <span className="font-light text-sm text-gray-600">
                Já tem conta?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Entrar
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
