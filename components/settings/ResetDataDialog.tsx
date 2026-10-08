"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { useSettingsStore } from "@/store/settingsStore";

export function ResetDataDialog() {
  const router = useRouter();
  const resetProgress = useProgressStore((state) => state.resetProgress);
  const clear = useSessionStore((state) => state.clear);
  const resetSettings = useSettingsStore((state) => state.resetSettings);
  function reset() { if (!window.confirm("Xóa toàn bộ tiến độ, phiên học và cài đặt?")) return; resetProgress(); clear(); resetSettings(); router.push("/"); }
  return <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4"><p className="font-semibold">Xóa dữ liệu</p><p className="mt-1 text-sm text-muted-foreground">Xóa tiến độ, danh sách ôn tập, phiên quiz hiện tại và cài đặt.</p><Button variant="destructive" className="mt-4 min-h-11" onClick={reset}>Xóa dữ liệu</Button></div>;
}
