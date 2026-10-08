"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AnswerInput({ onSubmit, disabled = false }: { onSubmit: (input: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { if (disabled) buttonRef.current?.focus(); }, [disabled]);
  return <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); if (value.trim() && !disabled) onSubmit(value); }}>
    <Input value={value} onChange={(event) => setValue(event.target.value)} autoFocus={!disabled} autoCapitalize="off" autoCorrect="off" spellCheck={false} disabled={disabled} placeholder="Nhập câu trả lời..." onKeyDown={(event) => { if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault(); }} className="h-12 text-base" />
    <Button ref={buttonRef} type="submit" disabled={disabled || !value.trim()} className="min-h-11 w-full">{disabled ? "Đang xử lý..." : "Kiểm tra"}</Button>
  </form>;
}
