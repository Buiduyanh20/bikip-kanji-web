import Link from "next/link";
import type { ContentType, Level } from "@/types/content";
import { toUrlLevel } from "@/utils/constants";

export function LevelCard({ level, contentType, count }: { level: Level; contentType: ContentType; count: number }) {
  const available = count > 0;
  const href = `/${contentType}/${toUrlLevel(level)}`;
  return (
    <div className={`rounded-2xl border bg-card p-5 shadow-sm ${available ? "" : "opacity-60"}`} aria-disabled={!available}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xl font-bold">{level}</p>
          <p className="mt-1 text-sm text-muted-foreground">{available ? `${count} mục học` : "Sắp có"}</p>
        </div>
        {available ? (
          <Link href={href} className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Bắt đầu
          </Link>
        ) : <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">Sắp có</span>}
      </div>
    </div>
  );
}
