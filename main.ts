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
const bytes = readFileSync(source);
writeFileSync(target, bytes);
