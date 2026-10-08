import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans, Noto_Sans_JP } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-noto-sans",
  display: "swap",
});

// Font tiếng Nhật rất nặng nên tắt preload, trình duyệt chỉ tải khi gặp ký tự Nhật.
const notoJp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Bí Kíp Kanji",
  description:
    "Người Việt học Kanji dễ hơn bằng âm Hán Việt và mẹo ghi nhớ",
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${inter.variable} ${notoSans.variable} ${notoJp.variable}`}>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
