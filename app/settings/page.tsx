import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { NameForm } from "@/components/settings/NameForm";
import { ResetDataDialog } from "@/components/settings/ResetDataDialog";
import { ProgressTransfer } from "@/components/settings/ProgressTransfer";
export default function SettingsPage() { return <PageContainer size="narrow"><PageHeader title="Cài đặt" backHref="/" /><div className="space-y-8 rounded-2xl border bg-card p-5"><NameForm /><ProgressTransfer /><ResetDataDialog /><p className="text-center text-xs text-muted-foreground">Bí Kíp Kanji v1.0.0</p></div></PageContainer>; }
