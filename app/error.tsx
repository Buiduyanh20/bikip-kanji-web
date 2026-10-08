"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center"><p className="text-5xl">😵</p><h1 className="mt-4 text-2xl font-bold">Có lỗi xảy ra</h1><p className="mt-2 text-muted-foreground">Bạn có thể thử lại hoặc quay về trang chủ.</p><div className="mt-6 flex gap-3"><Button onClick={reset}>Thử lại</Button><Link href="/" className="inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-semibold">Về trang chủ</Link></div></main>;
}
