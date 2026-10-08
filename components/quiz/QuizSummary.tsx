import Link from "next/link";
import type { QuizQuestion } from "@/types/quiz";
import { getItemById } from "@/repositories/contentRepository";
import { getMethodLabel } from "@/utils/constants";
import { Button } from "@/components/ui/button";

type QuizSummaryProps = {
  correct: number;
  total: number;
  mistakes: QuizQuestion[];
  reviewMode: boolean;
  onRestart: () => void;
  onReview: () => void;
};

function SummaryItem({ questions }: { questions: QuizQuestion[] }) {
  const question = questions[0];
  const item = getItemById(question.contentType, question.itemId);
  if (!item) return null;
  const labels = questions.map((entry) => getMethodLabel(entry.contentType, entry.method));
  return (
    <li className="rounded-xl border bg-background p-4">
      <div className="flex items-start gap-3">
        <span className="kanji-display text-4xl">{"char" in item ? item.char : item.word}</span>
        <div className="min-w-0 text-left">
          <p className="font-semibold">{labels.join(" · ")}</p>
          {"char" in item ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Hán Việt: {item.hanViet.join(", ")} · Nghĩa: {item.meanings.join(", ")}
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              Đọc: {item.reading} · Nghĩa: {item.meanings.join(", ")}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export function QuizSummary({ correct, total, mistakes, reviewMode, onRestart, onReview }: QuizSummaryProps) {
  const groupedMistakes = Array.from(
    mistakes.reduce((groups, question) => {
      const existing = groups.get(question.itemId) ?? [];
      groups.set(question.itemId, [...existing, question]);
      return groups;
    }, new Map<string, QuizQuestion[]>()),
    ([, questions]) => questions,
  );
  return (
    <div className="space-y-5 rounded-2xl border bg-card p-6 text-center shadow-sm">
      <p className="text-5xl">{correct === total ? "🎉" : "💪"}</p>
      <h2 className="text-2xl font-bold">Hoàn thành phiên học</h2>
      <p className="text-muted-foreground">Bạn đúng {correct}/{total} câu.</p>
      {groupedMistakes.length > 0 ? (
        <div className="rounded-xl bg-muted p-4 text-left">
          <p className="font-semibold">Câu cần xem lại</p>
          <ul className="mt-3 space-y-2">
            {groupedMistakes.map((questions) => <SummaryItem key={questions[0].itemId} questions={questions} />)}
          </ul>
        </div>
      ) : null}
      <div className="grid gap-3">
        {groupedMistakes.length > 0 && !reviewMode ? <Button variant="secondary" className="min-h-11" onClick={onReview}>Ôn các câu sai</Button> : null}
        {!reviewMode ? <Button className="min-h-11" onClick={onRestart}>Học lại</Button> : null}
        <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-lg border px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">Về trang chủ</Link>
      </div>
    </div>
  );
}
