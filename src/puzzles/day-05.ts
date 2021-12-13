/** https://adventofcode.com/2021/day/5 */

export function solvePuzzle5(input: string): [number, number] {

    const data: number[][][] = input.split('\n').map(row => {
        return row.split(" -> ").map(coords => coords.split(",").map(Number));
    });

    let maxX: number = 0, maxY: number = 0;
    data.forEach(coords => {
        const [[x1, y1], [x2, y2]] = coords;
        maxX = Math.max(maxX, Math.max(x1, x2));
        maxY = Math.max(maxY, Math.max(y1, y2));
    });

    let grid: number[][] = [];
    for (let i=0; i<=maxY; i++) {
        grid.push(new Array<number>(maxX+1).fill(0));
    }

    let diagonalCoords: number[][][] = [];
    data.forEach(coords => {
        const [[x1, y1], [x2, y2]] = coords;
        if (x1 === x2) {
            let start = Math.min(y1, y2);
            const end = Math.max(y1, y2);
            while (start <= end) {
                grid[start][x1] = grid[start][x1] + 1;
                start++;
            }
        } else if (y1 === y2) {
            let start = Math.min(x1, x2);
            const end = Math.max(x1, x2);
            while (start <= end) {
                grid[y1][start] = grid[y1][start] + 1;
                start++;
            }
        } else {
            diagonalCoords.push(coords);
        }
    });

    const p1: number = grid.reduce((a, row) => a += row.reduce((a, cell) => a += cell > 1 ? 1 : 0, 0), 0);

    diagonalCoords.forEach(coords => {
        const [[x1, y1], [x2, y2]] = coords;
        let x = 0, y = 0;
        x = (x1 > x2) ? -1 : 1;
        y = (y1 > y2) ? -1 : 1;
        
        let startX = x1, startY = y1;
        do {
            grid[startY][startX] = grid[startY][startX] + 1;
            startX += x;
            startY += y;
        }
        while (startX !== x2 && startY !== y2);
        grid[y2][x2] = grid[y2][x2] + 1;
    });

    const p2: number = grid.reduce((a, row) => a += row.reduce((a, cell) => a += cell > 1 ? 1 : 0, 0), 0);

    return [p1, p2];
}