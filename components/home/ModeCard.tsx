import Link from "next/link";

type ModeCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export function ModeCard({ icon, title, description, href }: ModeCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-32 items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span aria-hidden className="text-3xl">{icon}</span>
      <span>
        <span className="block text-lg font-bold">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">{description}</span>
      </span>
    </Link>
  );
}
