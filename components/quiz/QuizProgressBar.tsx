export function QuizProgressBar({ label, value, total }: { label: string; value: number; total: number }) {
  return <div aria-label={`Tiến độ ${label}`}><div className="mb-2 flex justify-between text-sm font-medium"><span>Tiến độ</span><span>{label}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${total ? (value / total) * 100 : 0}%` }} /></div></div>;
}
