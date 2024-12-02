import { puzzleInput, toInt } from '../tools.js';

const inputLines = puzzleInput('src/day01/input.txt').split('\n');

const left: number[] = [];
const right: number[] = [];
for (const line of inputLines) {
  const [leftSegment, rightSegment] = line.split('   ');
  if (leftSegment) {
    left.push(toInt(leftSegment) ?? -1);
  }
  if (rightSegment) {
    right.push(toInt(rightSegment) ?? -1);
  }
}

const sortedLeft = left.sort((a, b) => a - b);
const sortedRight = right.sort((a, b) => a - b);
const hash = new Map<number, number>();
for (const r of sortedRight) {
  hash.set(r, (hash.get(r) ?? 0) + 1);
}

const similarities: number[] = [];
for (const left of sortedLeft) {
  const similarity = left * (hash.get(left) ?? 0);
  similarities.push(similarity);
}

const sum = similarities.reduce((a, b) => a + b, 0);
console.log(sum);
