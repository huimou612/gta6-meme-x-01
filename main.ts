// main.ts — entrypoint for the gta6-meme-x-01 bounty.
//
// This program has exactly one job: hand the house the address of the X
// post that carries the meme. It copies POST.json from the repository
// root into the output directory, byte for byte, so the grader reads the
// same address the repository holds.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const repoDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(repoDir, "POST.json");
const target = join(outDir, "POST.json");

mkdirSync(outDir, { recursive: true });

// Read the address, failing loudly instead of silently handing the
// house nothing: a missing or unreadable POST.json is an entry error,
// not something to paper over with an empty output file.
let bytes: Buffer;
try {
  bytes = readFileSync(source);
} catch (err) {
  console.error(`main.ts: cannot read ${source}: ${(err as Error).message}`);
  process.exit(1);
}
writeFileSync(target, bytes);

// Read the copy back and prove it is the same file, byte for byte.
// If the write was cut short or corrupted, say so and fail rather
// than letting the grader read a different address than the repo holds.
const written = readFileSync(target);
if (!written.equals(bytes)) {
  console.error(
    `main.ts: ${target} does not match ${source} after copying (${written.length} bytes written, ${bytes.length} expected)`,
  );
  process.exit(1);
}

console.log(`main.ts: copied ${source} to ${target} (${bytes.length} bytes, verified)`);
