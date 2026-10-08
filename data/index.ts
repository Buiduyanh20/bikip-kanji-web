import kanjiN1 from "./kanji/n1.json";
import kanjiN2 from "./kanji/n2.json";
import kanjiN3 from "./kanji/n3.json";
import kanjiN4 from "./kanji/n4.json";
import kanjiN5 from "./kanji/n5.json";
import vocabularyN1 from "./vocabulary/n1.json";
import vocabularyN2 from "./vocabulary/n2.json";
import vocabularyN3 from "./vocabulary/n3.json";
import vocabularyN4 from "./vocabulary/n4.json";
import vocabularyN5 from "./vocabulary/n5.json";

export const kanjiData = {
  N1: kanjiN1,
  N2: kanjiN2,
  N3: kanjiN3,
  N4: kanjiN4,
  N5: kanjiN5,
} as const;

export const vocabularyData = {
  N1: vocabularyN1,
  N2: vocabularyN2,
  N3: vocabularyN3,
  N4: vocabularyN4,
  N5: vocabularyN5,
} as const;
