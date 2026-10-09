"use client";

import { useCallback, useState } from "react";
import type { Kanji } from "@/types/content";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { KanjiSearchInput } from "@/components/search/KanjiSearchInput";
import { KanjiSearchResult } from "@/components/search/KanjiSearchResult";

export default function KanjiSearchPage() {
  const [results, setResults] = useState<Kanji[]>([]);
  const [keyword, setKeyword] = useState("");
  const handleResults = useCallback((nextResults: Kanji[]) => setResults(nextResults), []);

  return (
    <PageContainer size="narrow">
      <PageHeader title="🔍 Tra Kanji" subtitle="Tìm chữ Kanji, âm Hán Việt và nghĩa tiếng Việt." backHref="/kanji" />
      <div className="space-y-6">
        <KanjiSearchInput onResults={handleResults} onKeywordChange={setKeyword} />
        <KanjiSearchResult keyword={keyword} results={results} />
      </div>
    </PageContainer>
  );
}
