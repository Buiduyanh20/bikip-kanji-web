"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, RotateCcw, BarChart3, Settings, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/store/sessionStore";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Các tiền tố đường dẫn được coi là "đang ở mục này" */
  match: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Học",
    href: "/",
    icon: BookOpen,
    match: (p) => p === "/" || p.startsWith("/kanji") || p.startsWith("/vocabulary"),
  },
  { label: "Ôn tập", href: "/review", icon: RotateCcw, match: (p) => p.startsWith("/review") },
  { label: "Tiến độ", href: "/progress", icon: BarChart3, match: (p) => p.startsWith("/progress") },
  { label: "Cài đặt", href: "/settings", icon: Settings, match: (p) => p.startsWith("/settings") },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const session = useSessionStore((state) => state.session);

  // Đang làm quiz thì ẩn thanh điều hướng để không bấm nhầm giữa chừng.
  if (pathname.endsWith("/quiz") || (pathname === "/review" && session?.mode === "review" && session.phase !== "finished")) return null;

  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto flex max-w-md">
        {NAV_ITEMS.map(({ label, href, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-6" strokeWidth={active ? 2.4 : 2} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
