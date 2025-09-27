import { ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Header } from "../../components/ui/Header";
import { Input } from "../../components/ui/Input";
import { useAddWorkerController } from "./useAddWorkerController";

export function AddWorker() {
  const {  handleSubmit, errors, isPending, register } =
    useAddWorkerController();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex  justify-center items-center  mt-10">
        <div className="container flex justify-center  px-6  mt-10 ">
          <div className=" bg-white  rounded-lg max-w-2xl w-full py-8 px-12 shadow-2xl my-10">
            <div className="mb-8 flex items-center gap-2">
              <ChevronLeft
                onClick={() => window.history.back()}
                className="w-8 h-8 hover:bg-gray-300/50 rounded-full cursor-pointer p-1"
              />
              <h1 className="text-3xl font-semibold">Adicionar funcionário</h1>
            </div>
            <form onSubmit={handleSubmit} className=" mt-6 space-y-4">
              <label>Nome do funcionario</label>
              <Input
                placeholder="João Carlos"
                {...register("name")}
                error={errors.name?.message}
              />
              <label>Email</label>
              <Input
                type="email"
                placeholder="joao.carlos@credifit.com"
                {...register("email")}
                error={errors.email?.message}
              />

              <label>CPF</label>
              <Input
                placeholder="123.345.678-25"
                mask="cpf"
                {...register("cpf")}
                error={errors.cpf?.message}
              />

              <label>Salário</label>
              <Input
                mask="salary"
                placeholder="R$"
                {...register("salary")}
                error={errors.salary?.message}
              />

              <label>Senha</label>
              <Input
                type="password"
                placeholder="Senha"
                {...register("password")}
                error={errors.password?.message}
              />
              <div className=" flex gap-4">
                <Button
                  variant="ghost"
                  className="mt-10"
                  onClick={() => window.history.back()}
                >
                  Voltar
                </Button>
                <Button className="mt-10" isLoading={isPending} type="submit">
                  Adicionar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
