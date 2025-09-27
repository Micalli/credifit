"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from './Button';
interface DropdownOption {
  label: string;
  shortcut?: string;
  color?: "default" | "red";
  onClick?: () => void;
}

interface DropdownProps {
  triggerLabel: string;
  trigger: React.ReactNode;
  options: DropdownOption[];
}

export function CustomDropdown({ options,trigger }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          className="flex items-center gap-2 border-0 p-2 hover:text-gray-400"
        >
        {trigger}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[200px] rounded-md bg-header p-1 shadow-md bg-white"
        sideOffset={8}
      >
        {options.map((option, index) =>
          option.label === "---" ? (
            <DropdownMenu.Separator
              key={index}
              className="my-1 h-px bg-gray-200"
            />
          ) : (
            <DropdownMenu.Item
              key={index}
              onSelect={option.onClick}
              className={`flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-400/20 text-gray-600 ${
                option.color === "red" ? "text-red-600" : ""
              }`}
            >
              {option.label}
              {option.shortcut && (
                <span className="text-xs text-gray-500">{option.shortcut}</span>
              )}
            </DropdownMenu.Item>
          )
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
