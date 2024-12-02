import { puzzleInput, toInt } from '../tools.js';

const inputLines = puzzleInput('src/day01/input.txt').split('\n');

const left: number[] = [];
const right: number[] = [];
for (const line of inputLines) {
  const segments = line.split('   ');
  if (segments.length !== 2) {
    continue;
  }
  if (segments[0]) {
    left.push(toInt(segments[0]) ?? -1);
  }
  if (segments[1]) {
    right.push(toInt(segments[1]) ?? -1);
  }
}

const sortedLeft = left.toSorted();
const sortedRight = right.toSorted();
const hash = new Map<number, number>();
for (let i = 0; i < sortedRight.length; i++) {
  const r = right[i];
  if (!r) {
    continue;
  }

  hash.set(r, (hash.get(r) ?? 0) + 1);
}

const similarities: number[] = [];
for (let i = 0; i < sortedLeft.length; i++) {
  const left = sortedLeft[i];
  if (!left) {
    continue;
  }

  const similarity = left * (hash.get(left) ?? 0);
  similarities.push(similarity);
}

const sum = similarities.reduce((a, b) => a + b, 0);
console.log(sum);
