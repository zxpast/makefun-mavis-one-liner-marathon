// One-Liner Marathon — make.fun entry (program/v1, Node 22+, stdlib only).
//
// One funny line, any subject: a night guard, his routine, and the motive
// behind it — the twist lands in the last words and reframes the whole
// routine as something darker. Nothing explained.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The night guard has watched the same empty corridor for 11 years and still waves at the camera every hour, in case the footage is his only obituary.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to MAX_CHARS characters,
// counted as Unicode code points, a single non-blank line with no
// leading/trailing whitespace (the gate counts every character).
const MAX_CHARS = 280;

function validateEntry(text: string): { codePoints: number; bytes: number } {
  const codePoints = [...text].length;
  const bytes = Buffer.byteLength(text, "utf8");
  if (codePoints < 1 || codePoints > MAX_CHARS) {
    throw new Error(
      `entry is ${codePoints} code points, gate needs 1-${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0 || text.includes("\n")) {
    throw new Error("entry must be one non-blank line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  return { codePoints, bytes };
}

const { codePoints, bytes } = validateEntry(ENTRY);

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read back: a silent short write must never pass as a valid entry.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`${ENTRY} (${codePoints} code points, ${bytes} bytes)`);
