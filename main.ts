import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = readFileSync(join(import.meta.dirname, "entry.png"));

// Refuse to ship a broken file: a PNG must start with its 8-byte signature.
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!entry.subarray(0, 8).equals(pngMagic)) {
  throw new Error("entry.png is not a PNG file");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(join(import.meta.dirname, "entry.png"), join(outDir, "entry.png"));
console.log(`wrote entry.png (${entry.length} bytes) to ${outDir}`);
