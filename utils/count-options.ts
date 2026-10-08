export type CountOptionValue = number | "all" | "custom";

export type CountOption = {
  value: CountOptionValue;
  label: string;
};

export function getCountOptions(total: number): CountOption[] {
  if (total < 1) return [];
  const values = total <= 20
    ? Array.from({ length: total }, (_, index) => index + 1)
    : [5, 10, 15, 20, 30, 50, 100].filter((value) => value < total);

  return [
    ...values.map((value) => ({ value, label: String(value) })),
    { value: "all", label: `Tất cả (${total})` },
    { value: "custom", label: "Tùy chỉnh" },
  ];
}
