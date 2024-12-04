import { puzzleInput, toInt } from '../tools.js';

const input = puzzleInput('src/day03/input.txt').replaceAll('\n', '');
const MUL_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;
const DONT_REGEX = /don\'t\(\)/g;
const DO_REGEX = /do\(\)/g;

let sum = 0;
let prevIndex = 0;
const muls = findInstructions(input, MUL_REGEX);

for (const mul of muls) {
  const before = input.slice(prevIndex, mul.index);
  const donts = findInstructions(before, DONT_REGEX);
  const dos = findInstructions(before, DO_REGEX);

  const noDontsInRange = donts.length === 0;
  const doAfterLastDont =
    donts.length > 0 && dos.length > 0 && donts[donts.length - 1]!.lastIndex < dos[dos.length - 1]!.index;
  const isGood = noDontsInRange || doAfterLastDont;

  if (isGood) {
    const [a, b] = mul.instruction.slice(4, -1).split(',');
    const product = toInt(a!)! * toInt(b!)!;
    sum += product;
    prevIndex = mul.lastIndex;
  }
}

console.log(sum);

type InstructionMatch = {
  instruction: string;
  index: number;
  lastIndex: number;
};

function findInstructions(input: string, regex: RegExp): InstructionMatch[] {
  const matches: InstructionMatch[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    matches.push({ instruction: match[0], index: match.index, lastIndex: regex.lastIndex });
  }

  return matches;
}
