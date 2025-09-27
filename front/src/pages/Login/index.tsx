import { Button } from "../../components/ui/Button";
import { Header } from "../../components/ui/Header";
import { Input } from "../../components/ui/Input";
import { useLoginController } from './useLoginController';

export function Login() {

  const { handleSubmit, isPending, loginMode, setLoginMode, errors, register } =
    useLoginController();

  return (
    <div className="h-screen p-16 flex justify-center items-center">
      <Header />

      <div className="bg-white rounded-lg max-w-2xl w-full py-8 px-12 shadow-2xl">
        <div className="flex flex-col items-center text-xl mb-4">
          Login
          <span className="text-gray-500 font-light text-sm">Entre como:</span>
        </div>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            type="button"
            onClick={() => setLoginMode("employee")}
            className={`px-4 py-2 rounded-lg border ${
              loginMode === "employee"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Funcionário
          </Button>
          <Button
            type="button"
            onClick={() => setLoginMode("company")}
            className={`px-4 py-2 rounded-lg border ${
              loginMode === "company"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Empresa
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {loginMode === "employee" ? (
            <>
              <label>Email</label>
              <Input
                placeholder="joao@exemplo.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </>
          ) : (
            <>
              <label>Email </label>
              <Input
                placeholder="empresa@exemplo.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </>
          )}

          <label>Senha</label>
          <Input
            type="password"
            placeholder="Sua senha"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button className="mt-10 w-full" type="submit" isLoading={isPending}>
            Logar
          </Button>

          <div className="mt-6 text-center">
            <span className="font-light text-sm text-gray-600">
              Não tem conta?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Se cadastre aqui
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
