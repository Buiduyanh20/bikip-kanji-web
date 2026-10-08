"use client";

import { COUNT_OPTIONS } from "@/utils/constants";

export function CountSelector({ count, total, onChange }: { count?: number; total: number; onChange: (count: number) => void }) {
  const options = COUNT_OPTIONS.filter((option) => option <= total);
  if (!options.includes(total as (typeof COUNT_OPTIONS)[number]) && total > 0) options.push(total as (typeof COUNT_OPTIONS)[number]);
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">Số lượng câu</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label key={option} className={`inline-flex min-h-11 cursor-pointer items-center rounded-xl border px-5 ${count === option ? "border-primary bg-primary/10 text-primary" : "hover:border-primary/50"}`}>
            <input type="radio" name="count" className="sr-only" checked={count === option} onChange={() => onChange(option)} />
            {option === total && total < 10 ? `Tất cả (${total})` : option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
