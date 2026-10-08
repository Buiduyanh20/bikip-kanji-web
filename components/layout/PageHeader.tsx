import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  /** Có backHref thì hiện nút quay lại */
  backHref?: string;
  /** Phần tử bên phải (vd: số câu 5/20) */
  trailing?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, subtitle, backHref, trailing, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-6 flex items-center gap-3", className)}>
      {backHref ? (
        <Link
          href={backHref}
          aria-label="Quay lại"
          className="-ml-2 flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronLeft className="size-6" />
        </Link>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-2xl font-bold leading-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </header>
  );
}
