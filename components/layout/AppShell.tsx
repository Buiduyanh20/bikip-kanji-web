import Link from "next/link";
import { Suspense } from "react";
import { MobileBottomNav } from "./MobileBottomNav";

/**
 * Khung chung cho mọi màn hình: thanh logo trên cùng + nội dung + thanh điều hướng dưới (mobile).
 * Là server component; phần cần pathname nằm trong MobileBottomNav.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span aria-hidden>🈶</span>
            Bí Kíp Kanji
          </Link>
        </div>
      </div>

      {/* pb-24 chừa chỗ cho thanh điều hướng dưới trên mobile */}
      <main className="flex-1 pb-24 md:pb-8">{children}</main>

      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
