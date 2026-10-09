"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchKanji } from "@/repositories/contentRepository";
import type { Kanji } from "@/types/content";

export function KanjiSearchInput({ onResults, onKeywordChange }: { onResults: (results: Kanji[]) => void; onKeywordChange: (keyword: string) => void }) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => onResults(searchKanji(keyword)), 120);
    return () => window.clearTimeout(timer);
  }, [keyword, onResults]);

  return (
    <div className="space-y-3">
      <label htmlFor="kanji-search" className="block text-sm font-semibold">
        Tìm theo chữ Kanji, âm Hán Việt hoặc nghĩa tiếng Việt
      </label>
      <Input
        id="kanji-search"
        value={keyword}
        onChange={(event) => {
          setKeyword(event.target.value);
          onKeywordChange(event.target.value);
        }}
        placeholder="Nhập Kanji, âm Hán Việt hoặc nghĩa"
        autoComplete="off"
        className="min-h-12 text-base"
      />
      <p className="text-sm text-muted-foreground">
        Ví dụ: 母, mẫu, mẹ
      </p>
    </div>
  );
}
