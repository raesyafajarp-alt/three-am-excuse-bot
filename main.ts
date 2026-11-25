// three-am-excuse-bot
// Writes one line, the most creative excuse a hardware wallet gives
// for refusing to sign a transaction at 3 AM, to /output/entry.txt.
// Deterministic, no network, no dependencies.
//
// The excuse: it is 3 AM, the fridge is humming, the owner's eyes are
// half-closed, and the transaction is a frog coin. The wallet keeps a
// bedtime; the owner clearly does not. The refusal lands in one word.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const EXCUSE =
  "3 AM. The fridge hums, your eyes are half-closed, and you want me to sign for a frog coin. I keep a bedtime. You have a problem. No.";

// The gate: 1 to 200 characters, counted as Unicode code points.
const length = [...EXCUSE].length;
if (length < 1 || length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`Excuse is ${length} characters; must be 1-200 and non-blank.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
let outPath = join(outDir, "entry.txt");

try {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
} catch {
  outPath = join("output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
}

console.log(`Wrote ${[...EXCUSE].length} characters to ${outPath}`);
