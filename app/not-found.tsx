import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return <PageContainer size="narrow"><div className="rounded-2xl border bg-card p-8 text-center"><p className="text-5xl">🈳</p><h1 className="mt-4 text-2xl font-bold">Không tìm thấy trang</h1><p className="mt-2 text-muted-foreground">Nội dung này chưa có hoặc đường dẫn không đúng.</p><Link href="/" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-primary">Về trang chủ</Link></div></PageContainer>;
}
