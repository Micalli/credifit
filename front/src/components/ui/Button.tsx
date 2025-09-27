import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
  iconRight?: React.ReactNode;
}
export function Button({
  className,
  isLoading,
  disabled,
  variant,
  children,
  iconRight,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "w-full bg-primary text-white font-semibold py-3 px-4 rounded-md hover:bg-primary/90  active:bg-[#057D88] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 cursor-pointer flex items-center justify-center",
        variant === "danger" && "bg-red-900 hover:bg-red-700",
        variant === "ghost" &&
          "bg-transparent  hover:bg-gray-500/20 text-gray-500 border border-gray-500 active:bg-gray-500/30 disabled:bg-transparent",

        className
      )}
    >
      {!isLoading && (
        <div className="flex gap-2">
          {iconRight}
          {children}
        </div>
      )}
      {isLoading && <Spinner classname="w-6 h-6" />}
    </button>
  );
}
