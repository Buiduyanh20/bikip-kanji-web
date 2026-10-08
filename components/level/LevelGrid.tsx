import type { ContentType, Level } from "@/types/content";
import { LEVELS } from "@/utils/constants";
import { countByLevel } from "@/repositories/contentRepository";
import { LevelCard } from "./LevelCard";

export function LevelGrid({ contentType }: { contentType: ContentType }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEVELS.map((level: Level) => <LevelCard key={level} level={level} contentType={contentType} count={countByLevel(contentType, level)} />)}
    </div>
  );
}
