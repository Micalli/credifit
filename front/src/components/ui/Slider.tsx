import * as RdxSlider from "@radix-ui/react-slider";
import { useState } from "react";
interface SliderProps {
  maxValue: number | undefined;
  initialValue: number;
  hiddenSlider: boolean;
  hiddenValue: boolean;
  onChange?: (value: number) => void;
}

export function Slider({
  maxValue,
  initialValue,
  hiddenSlider,
  hiddenValue,
  onChange,
}: SliderProps) {
  const [value, setValue] = useState([initialValue]); // valor inicial
    const handleChange = (newValue: number[]) => {
      setValue(newValue);
      onChange?.(newValue[0]); // envia para o Loan.tsx
    };


  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Valor acima */}
      {!hiddenValue && (
        <div className="px-4 py-2 rounded-xl bg-gray-100 text-teal-900 font-semibold text-lg shadow-sm">
          R$ {value[0].toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
      )}

      {/* Slider */}
      {!hiddenSlider && (
        <RdxSlider.Root
          className="relative flex items-center w-full h-5"
          defaultValue={value}
          max={maxValue}
          step={1000}
          value={value}
          onValueChange={handleChange}
        >
          {/* Trilha */}
          <RdxSlider.Track className="bg-gray-300 relative grow rounded-full h-2">
            <RdxSlider.Range className="absolute bg-teal-500 rounded-full h-full" />
          </RdxSlider.Track>

          {/* Thumb */}
          <RdxSlider.Thumb className="block w-5 h-5 bg-teal-600 rounded-full shadow-md hover:bg-teal-700 focus:outline-none" />
        </RdxSlider.Root>
      )}
    </div>
  );
}
