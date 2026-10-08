"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { ItemProgress } from "@/types/progress";
import { useProgressStore } from "@/store/progressStore";

type ExportPayload = {
  version: 1;
  exportedAt: string;
  items: Record<string, ItemProgress>;
};

export function ProgressTransfer() {
  const items = useProgressStore((state) => state.items);
  const replaceProgress = useProgressStore((state) => state.replaceProgress);
  const inputRef = useRef<HTMLInputElement>(null);

  function exportData() {
    const payload: ExportPayload = { version: 1, exportedAt: new Date().toISOString(), items };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bikip-kanji-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importData(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<ExportPayload>;
        if (!parsed.items || typeof parsed.items !== "object" || Array.isArray(parsed.items)) throw new Error("invalid");
        replaceProgress(parsed.items as Record<string, ItemProgress>);
      } catch {
        window.alert("Tệp tiến độ không hợp lệ.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="space-y-3 rounded-xl border p-4">
      <div>
        <p className="font-semibold">Sao lưu tiến độ</p>
        <p className="mt-1 text-sm text-muted-foreground">Xuất tiến độ để lưu trữ hoặc nhập lại trên trình duyệt khác.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="outline" className="min-h-11" onClick={exportData}>Xuất dữ liệu</Button>
        <Button type="button" variant="outline" className="min-h-11" onClick={() => inputRef.current?.click()}>Nhập dữ liệu</Button>
      </div>
      <input ref={inputRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => importData(event.target.files?.[0])} />
    </div>
  );
}
