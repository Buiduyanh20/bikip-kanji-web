"use client";

import type { ContentType } from "@/types/content";
import type { Method } from "@/types/quiz";
import { getMethodLabel, METHODS_BY_CONTENT_TYPE } from "@/utils/constants";

export function MethodSelector({ contentType, value, available, onChange }: { contentType: ContentType; value?: Method; available: Method[]; onChange: (method: Method) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">Phương pháp học</legend>
      <div className="grid gap-3">
        {METHODS_BY_CONTENT_TYPE[contentType].map((method) => {
          const enabled = available.includes(method);
          return (
            <label key={method} className={`flex min-h-14 items-center gap-3 rounded-xl border p-4 ${enabled ? "cursor-pointer hover:border-primary/50" : "cursor-not-allowed opacity-50"}`}>
              <input type="radio" name="method" value={method} checked={value === method} disabled={!enabled} onChange={() => onChange(method)} className="size-4 accent-primary" />
              <span className="text-sm font-medium">{getMethodLabel(contentType, method)}</span>
              {!enabled ? <span className="ml-auto text-xs text-muted-foreground">Sắp có</span> : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
