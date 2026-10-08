import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  description?: string;
  /** Nút/link nằm bên phải tiêu đề */
  action?: React.ReactNode;
  className?: string;
};

export function SectionTitle({ title, description, action, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-bold leading-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
