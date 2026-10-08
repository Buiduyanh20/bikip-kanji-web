"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountOptions } from "@/utils/count-options";

export type CountSelection = number | "all" | "custom";

type CountSelectorProps = {
  total: number;
  value: CountSelection;
  onChange: (value: CountSelection) => void;
  customCount: string;
  onCustomCountChange: (value: string) => void;
};

export function CountSelector({
  total,
  value,
  onChange,
  customCount,
  onCustomCountChange,
}: CountSelectorProps) {
  const [touchedCustom, setTouchedCustom] = useState(false);
  const options = getCountOptions(total);
  const parsedCustom = Number(customCount);
  const customValid = /^\d+$/.test(customCount) && parsedCustom >= 1 && parsedCustom <= total;
  const customError = touchedCustom && !customValid
    ? `Nhập số nguyên từ 1 đến ${total}.`
    : undefined;

  function handleValueChange(next: string | null) {
    if (!next) return;
    const option = options.find((entry) => String(entry.value) === next);
    if (option) {
      if (option.value === "custom") setTouchedCustom(true);
      onChange(option.value);
    }
  }

  return (
    <div className="space-y-3">
      <label htmlFor="question-count" className="block text-sm font-semibold">
        Số lượng câu
      </label>
      <p className="text-sm text-muted-foreground">
        Level này có {total} {total === 1 ? "mục" : "mục"}.
      </p>
      <Select value={String(value)} onValueChange={handleValueChange}>
        <SelectTrigger id="question-count" aria-label="Chọn số lượng câu" className="min-h-11 w-full">
          <SelectValue placeholder="Chọn số lượng" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value === "custom" ? (
        <div className="space-y-2">
          <label htmlFor="custom-count" className="text-sm font-medium">
            Số câu tùy chỉnh
          </label>
          <Input
            id="custom-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={total}
            step={1}
            value={customCount}
            aria-invalid={Boolean(customError)}
            aria-describedby={customError ? "custom-count-error" : undefined}
            onChange={(event) => {
              setTouchedCustom(true);
              onCustomCountChange(event.target.value);
            }}
            className="h-11"
          />
          {customError ? (
            <p id="custom-count-error" className="text-sm text-destructive" role="alert">
              {customError}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
