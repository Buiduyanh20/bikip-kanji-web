import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { LevelGrid } from "@/components/level/LevelGrid";

export default function KanjiLevelsPage() {
  return <PageContainer><PageHeader title="Học Kanji" subtitle="Chọn cấp độ bạn muốn luyện tập." backHref="/" /><LevelGrid contentType="kanji" /></PageContainer>;
}
