import { puzzleInput } from '../tools';

function countTarget(target: string, grid: string[]): number {
  const directions = [
    [0, 1], // up
    [1, 0], // right
    [1, 1], // down-right
    [1, -1], // right, down, diagonal down-right, diagonal down-left
    [0, -1], // left
    [-1, 0], // up
    [-1, -1], // up-left
    [-1, 1], // left, up, diagonal up-left, diagonal up-right
  ];
  const rows = grid.length;
  const cols = grid[0]!.length;
  let count = 0;

  const isValid = (x: number, y: number): boolean => {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  };

  const search = (x: number, y: number, dx: number, dy: number): boolean => {
    for (let i = 0; i < target.length; i++) {
      if (!isValid(x + i * dx, y + i * dy) || grid[x + i * dx]![y + i * dy] !== target[i]) {
        return false;
      }
    }
    return true;
  };

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x]![y] === target[0]) {
        for (const [dx, dy] of directions) {
          if (search(x, y, dx!, dy!)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

const grid = puzzleInput('src/day04/input.txt').split('\n');

console.log(countTarget('XMAS', grid));
