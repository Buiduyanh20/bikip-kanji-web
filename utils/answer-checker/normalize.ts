export function normalizeViet(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC");
}

export function capitalizeFirst(value: string): string {
  const trimmed = value.trim();
  return trimmed ? `${trimmed[0].toLocaleUpperCase("vi-VN")}${trimmed.slice(1)}` : "";
}
