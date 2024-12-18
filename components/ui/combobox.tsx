"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxOption = {
  value: string;
  label: string;
};

interface ComboboxProps {
  options: ComboboxOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder: string;
  emptyMessage: string;
  multiple?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  emptyMessage,
  multiple = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? value : [];
      if (newValue.includes(currentValue)) {
        onChange(newValue.filter((v) => v !== currentValue));
      } else {
        onChange([...newValue, currentValue]);
      }
    } else {
      onChange(currentValue);
      setOpen(false);
    }
  };

  const displayValue = React.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value
        .map((v) => options.find((option) => option.value === v)?.label)
        .join(", ");
    }
    return (
      options.find((option) => option.value === value)?.label || placeholder
    );
  }, [value, options, multiple, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    (
                      multiple && Array.isArray(value)
                        ? value.includes(option.value)
                        : value === option.value
                    )
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
