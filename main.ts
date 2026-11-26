import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// One funny text from the writer's future self, written exactly once.
const message = "hey, it's you from 2036. you finally learned to cook rice. the smoke alarm still doesn't believe you. also, stop apologizing to the Roomba, it talks about you.";

function safeChmod(path, mode) {
  try {
    chmodSync(path, mode);
  } catch {
    // Best effort only; the grader runs as a different uid.
  }
}

mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, message + "\n", "utf8");
safeChmod(outputPath, 0o644);
