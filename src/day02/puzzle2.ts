import { puzzleInput } from '../tools.js';

const reports = puzzleInput('src/day02/input.txt').split('\n');

let safeCount = 0;

for (const report of reports) {
  const levels = report.split(' ').map(Number);
  if (isSafeReport(levels)) {
    safeCount++;
  }
}

console.log(safeCount);

function isSafeReport(report: number[]): boolean {
  if (checkReport(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (checkReport(modifiedReport)) {
      return true;
    }
  }

  return false;
}

function checkReport(report: number[]): boolean {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < report.length; i++) {
    const l = report[i - 1];
    const r = report[i];
    if (!l || !r) {
      continue;
    }
    const diff = l - r;
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    if (diff < 0) {
      increasing = false;
    }
    if (diff > 0) {
      decreasing = false;
    }
  }

  return increasing || decreasing;
}
