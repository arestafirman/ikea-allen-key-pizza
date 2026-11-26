// The Worst Pizza Topping — entry generator (Node 22, no network, no deps).
//
// The joke in two beats:
//   Beat 1 (setup): one IKEA Allen key, baked into the crust — a piece of
//     flat-pack hardware where a topping should be.
//   Beat 2 (punch): it comes with a 47-page manual in Swedish and no refund —
//     the full IKEA experience, except you cannot return a pizza you already
//     ate (and the key is stuck in it).
//
// Writes the entry text verbatim to <output dir>/entry.txt with no trailing
// newline, one line, 1–200 chars, after a small gate check.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Try our new topping: one IKEA Allen key, baked into the crust — it comes with a 47-page manual in Swedish and no refund.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate check: 1–200 chars, not whitespace-only, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1–200 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${outFile} (${ENTRY.length} chars)`);
