import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const kanji = JSON.parse(await readFile(resolve(root, "data/kanji.json"), "utf8"));
const vocabulary = JSON.parse(await readFile(resolve(root, "data/vocabulary.json"), "utf8"));
const errors = [];
const ids = new Set();
const charsByLevel = new Set();

for (const item of kanji) {
  if (ids.has(item.id)) errors.push(`Trùng id Kanji: ${item.id}`);
  ids.add(item.id);
  const charKey = `${item.level}:${item.char}`;
  if (charsByLevel.has(charKey)) errors.push(`Trùng chữ trong level: ${charKey}`);
  charsByLevel.add(charKey);
  if (!Array.isArray(item.hanViet) || item.hanViet.length === 0) errors.push(`Thiếu hanViet: ${item.id}`);
  if (!Array.isArray(item.meanings) || item.meanings.length === 0) errors.push(`Thiếu meanings: ${item.id}`);
}

for (const item of vocabulary) {
  if (ids.has(item.id)) errors.push(`Trùng id: ${item.id}`);
  ids.add(item.id);
  if (!Array.isArray(item.meanings) || item.meanings.length === 0) errors.push(`Thiếu meanings: ${item.id}`);
  for (const kanjiId of item.kanjiIds ?? []) {
    if (!kanji.some((entry) => entry.id === kanjiId)) {
      errors.push(`Vocabulary ${item.id} tham chiếu Kanji không tồn tại: ${kanjiId}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Dữ liệu hợp lệ: ${kanji.length} Kanji, ${vocabulary.length} từ vựng.`);
