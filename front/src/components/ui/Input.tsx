import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { CircleX } from "lucide-react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
  helperText?: string;
  mask?: "cpf" | "cnpj" | "salary";
  iconLeft?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      name,
      id,
      error,
      className,
      helperText,
      mask,
      iconLeft,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? name;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (mask === "cpf") {
        value = value
          .replace(/\D/g, "") // remove tudo que não é dígito
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }

        if (mask === "cnpj") {
          value = value
            .replace(/\D/g, "") // remove tudo que não é dígito
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
        }
        
    if (mask === "salary") {
      // remove tudo que não é número
      let numericValue = value.replace(/\D/g, "");

      if (!numericValue) numericValue = "0";

      // separa centavos (últimos dois dígitos)
      const cents = numericValue.slice(-2);
      let reais = numericValue.slice(0, -2);

      // se não houver reais, assume "0"
      if (!reais) reais = "0";

      // remove zeros à esquerda
      reais = String(Number(reais));

      // adiciona pontos nos milhares
      reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      // junta com centavos
      value = `R$ ${reais},${cents.padStart(2, "0")}`;
    }


      e.target.value = value;
      props.onChange?.(e);
    };
    return (
      <div className="relative">
        <input
          {...props}
          name={name}
          ref={ref}
          id={inputId}
          onChange={handleChange}
          className={cn(
            "bg-background w-full text-black rounded-lg border border-gray-500 px-3 h-[52px]  pt-4 peer placeholder-shown:pt-0 focus:border-primary transition-all outline-none",
            error && "!border-red-900",
            className
          )}
          placeholder=""
        />

        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-500 peer-placeholder-shown:text-base  peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {iconLeft && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {iconLeft}
          </div>
        )}

        {helperText && (
          <span className=" ml-2 font-light text-gray-400 text-xs">
            {helperText}
          </span>
        )}
        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-800">
            <CircleX />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
