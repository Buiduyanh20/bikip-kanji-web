import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SetupForm } from "@/components/setup/SetupForm";
import { countByLevel } from "@/repositories/contentRepository";
import { fromUrlLevel } from "@/utils/constants";

export const instant = false;

export default async function VocabularySetupPage({ params }: { params: Promise<{ level: string }> }) {
  const level = fromUrlLevel((await params).level);
  if (!level || countByLevel("vocabulary", level) === 0) notFound();
  return <PageContainer size="narrow"><PageHeader title={`Từ vựng ${level}`} subtitle="Chọn cách học phù hợp với bạn." backHref="/vocabulary" /><SetupForm contentType="vocabulary" level={level} /></PageContainer>;
}
