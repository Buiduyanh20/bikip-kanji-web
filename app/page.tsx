import { PageContainer } from "@/components/layout/PageContainer";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeStatus } from "@/components/home/HomeStatus";
import { ModeCard } from "@/components/home/ModeCard";

export default function Home() {
  return (
    <PageContainer size="wide">
      <HomeHero><HomeStatus /></HomeHero>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ModeCard icon="📚" title="Học Kanji" description="Nhớ chữ qua âm Hán Việt, nghĩa và cách đọc." href="/kanji" />
        <ModeCard icon="📖" title="Học từ vựng" description="Luyện đọc và nghĩa của những từ quen thuộc." href="/vocabulary" />
        <ModeCard icon="🔍" title="Tra Kanji" description="Tìm Kanji, âm Hán Việt, nghĩa và cách đọc." href="/kanji/search" />
      </div>
    </PageContainer>
  );
}
