import * as fs from 'node:fs';

export function puzzleInput(path: string): string {
  return fs.readFileSync(path, 'utf8');
}

export function toInt(str: string): number | undefined {
  const n = parseInt(str, 10);
  if (Number.isNaN(n)) {
    return undefined;
  }

  return n;
}
