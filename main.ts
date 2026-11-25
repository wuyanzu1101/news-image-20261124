// news-image-20261124 entry (Node 22, standard library only).
// The front page is the entry.png beside this file; this program copies
// it to /output/entry.png. It reads nothing else and uses no network.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);
// Refuse to ship a broken image: a truncated copy must fail loudly here.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy is incomplete');
}
