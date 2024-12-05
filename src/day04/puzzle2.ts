import { puzzleInput } from '../tools';

function countXMAS(grid: string[]): number {
  const rows = grid.length;
  const cols = grid[0]!.length;
  let count = 0;

  const isValid = (x: number, y: number): boolean => {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  };

  const search = (x: number, y: number, dx: number, dy: number, target: string): boolean => {
    if (!isValid(x + 1 * dx, y + 1 * dy) || grid[x + 1 * dx]![y + 1 * dy] !== target) {
      return false;
    }
    return true;
  };

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x]![y] === 'A') {
        const upLeftM = search(x, y, -1, -1, 'M');
        const upLeftS = search(x, y, -1, -1, 'S');
        const upRightM = search(x, y, -1, 1, 'M');
        const upRightS = search(x, y, -1, 1, 'S');
        const downLeftM = search(x, y, 1, -1, 'M');
        const downLeftS = search(x, y, 1, -1, 'S');
        const downRightM = search(x, y, 1, 1, 'M');
        const downRightS = search(x, y, 1, 1, 'S');

        if (
          (upLeftM && downRightS && upRightM && downLeftS) ||
          (upLeftS && downRightM && upRightS && downLeftM) ||
          (upLeftM && downRightS && upRightS && downLeftM) ||
          (upLeftS && downRightM && upRightM && downLeftS)
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

const grid = puzzleInput('src/day04/input.txt').split('\n');

console.log(countXMAS(grid));
