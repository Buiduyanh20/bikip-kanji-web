import type { Kanji, Vocabulary } from "@/types/content";
import type { Method } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import type { AnswerValidationStatus } from "@/utils/answer-checker";

export function ResultPanel({ item, method, correct, status, input, expected, onNext, last }: { item: Kanji | Vocabulary; method: Method; correct: boolean; status: AnswerValidationStatus; input: string; expected: string[]; onNext: () => void; last: boolean }) {
  const isNear = status === "near";
  return <div className="space-y-5 rounded-2xl border bg-card p-5 shadow-sm">
    <div className={correct ? "text-success" : "text-destructive"}><p className="text-xl font-bold">{isNear ? "△ Gần đúng" : correct ? "✓ Chính xác" : "✕ Chưa đúng"}</p><p className="mt-2 text-sm">Bạn nhập: <strong>{input || "Không có đáp án"}</strong></p><p className="text-sm">{isNear ? "Đáp án đầy đủ" : "Đáp án"}: <strong>{expected.join(", ")}</strong></p>{!correct ? <p className="mt-2 text-sm text-primary">Đã thêm vào danh sách ôn tập</p> : null}</div>
    <div className="text-center"><p className="kanji-display">{"char" in item ? item.char : item.word}</p><p className="text-sm text-muted-foreground">{method === "reading" && "reading" in item ? item.reading : item.meanings.join(" · ")}</p>{("hint" in item && item.hint) ? <p className="mt-3 rounded-lg bg-muted p-3 text-left text-sm">Mẹo: {item.hint}</p> : null}</div>
    <Button className="min-h-11 w-full" onClick={onNext}>{last ? "Xem kết quả" : "Tiếp tục"}</Button>
  </div>;
}
