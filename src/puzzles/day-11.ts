/** https://adventofcode.com/2021/day/11 */

export function solvePuzzle11(input: string): [number, number] {

    let grid: number[][] = input.split('\n').map(x => x.split('').map(Number));
    const totalCells: number = grid.length * grid[0].length;

    const getAdjCells = ([x, y]: number[]): number[][] => {
        let cells: number[][] = [];
        for (let i = x-1; i <= x+1; i++) {
            for (let j = y-1; j <= y+1; j++) {
                cells.push([i, j]);
            }
        }
        return cells.filter(cell => isValidCell(cell));
    }

    const isValidCell = ([x, y]: number[]): boolean => {
        return grid[x] === undefined || grid[x][y] === undefined || grid[x][y] > 9 ? false : true;
    }

    function executeStep(): number {

        let cellsToFlash: number[][] = [];
        grid = grid.map((row, x) => row.map((val, y) => {
            let newVal = val + 1;
            if (newVal > 9) {
                cellsToFlash.push([x, y]);
            }
            return newVal;
        })); 

        if (cellsToFlash.length > 0) {
            do {
                getAdjCells(cellsToFlash.shift()).forEach(([x, y]) => {
                    grid[x][y] = grid[x][y] + 1;
                    if (grid[x][y] > 9) {
                        cellsToFlash.push([x,y]);
                    }
                });
            } while (cellsToFlash.length > 0 );
        }

        let flashCount: number = 0;
        grid = grid.map(row => row.map(val => {
            if (val > 9) {
                flashCount++;
                return 0;
            } else {
                return val;
            }
        }));

        return flashCount; // return number of flashed cells after step execution
    }

    // P1
    let steps: number = 100, flashes: number = 0;
    for (let step = 0; step < steps; step++) {       
        flashes += executeStep();
    }

    // P2
    let step: number = 100, allFlashed: boolean = false;
    do {
        step++;
        if (executeStep() === totalCells) {
            allFlashed = true;
        }
    } while (!allFlashed);
    
    return [flashes, step];

}