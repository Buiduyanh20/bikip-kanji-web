import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { LevelGrid } from "@/components/level/LevelGrid";

export default function VocabularyLevelsPage() {
  return <PageContainer><PageHeader title="Học từ vựng" subtitle="Chọn cấp độ bạn muốn luyện tập." backHref="/" /><LevelGrid contentType="vocabulary" /></PageContainer>;
}
