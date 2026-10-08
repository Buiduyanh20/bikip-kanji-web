import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressClient } from "@/components/progress/ProgressClient";
export default function ProgressPage() { return <PageContainer><PageHeader title="Tiến độ" subtitle="Theo dõi những gì bạn đã nhớ." backHref="/" /><ProgressClient /></PageContainer>; }
