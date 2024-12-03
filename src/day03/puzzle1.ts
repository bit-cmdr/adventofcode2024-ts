import { puzzleInput, toInt } from '../tools.js';

const input = puzzleInput('src/day03/input.txt').replaceAll('\n', '');
const MUL_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;

const muls = input.match(MUL_REGEX);

if (!muls) {
  throw new Error('No muls found');
}

let sum = 0;
for (const mul of muls) {
  const [a, b] = mul.slice(4, -1).split(',');
  const product = toInt(a!)! * toInt(b!)!;
  sum += product;
}

console.log(sum);
