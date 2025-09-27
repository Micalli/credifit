import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react"; // ícone de check

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: () => void;

  label?: string;
  disabled?: boolean;
}

export function CheckBox({
  checked,
  onChange,
  label,
  disabled,
  onClick,
}: CheckBoxProps) {
  return (
    <label className="flex items-center gap-2 text-black select-none hover:bg-gray-600/10 w-fit p-2 rounded-xl cursor-pointer">
      <CheckboxPrimitive.Root
        onClick={onClick}
        checked={checked}
        onCheckedChange={(state) => onChange?.(state === true)}
        disabled={disabled}
        className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center bg-header cursor-pointer "
      >
        <CheckboxPrimitive.Indicator>
          <Check className="w-4 h-4 text-primary" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="text-sm text-black">{label}</span>}
    </label>
  );
}
