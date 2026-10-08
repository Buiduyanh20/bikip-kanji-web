import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { MobileBottomNav } from "./MobileBottomNav";
import { Footer } from "./Footer";

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
            aria-label="Bí Kíp Kanji"
            className="flex h-10 w-44 items-center overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <Image
              src="/bi_kip_kanji.png"
              alt="Bí Kíp Kanji"
              width={768}
              height={512}
              className="h-full w-full object-cover object-center"
              priority
            />
          </Link>
        </div>
      </div>

      {/* pb-24 chừa chỗ cho thanh điều hướng dưới trên mobile */}
      <main className="flex-1 pb-24 md:pb-8">{children}</main>

      <Footer />

      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
