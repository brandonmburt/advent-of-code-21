/** https://adventofcode.com/2021/day/13 */

export function solvePuzzle13(input: string): [number, string] {

    let p1: number = 0;

    let [coordsInput, foldsInput] = input.split('\n\n');
    
    let coords: number[][] = [];
    coordsInput.split('\n').forEach(line => {
        const [x, y] = line.split(',').map(Number);
        coords.push([x, y]);
    });

    let folds: [string, number][] = [];
    foldsInput.split('\n').forEach(line => {
        const [axis, val] = line.split(' ')[2].split('=');
        folds.push([axis, +val]);
    });

    let maxX: number = Math.max(...coords.map(c => c[0]));
    let maxY: number = Math.max(...coords.map(c => c[1]));

    let grid: number[][] = [];
    for (let i = 0; i < maxY+1; i++) {
        grid.push(new Array<number>(maxX+1).fill(0));
    }

    coords.forEach(([x, y]) => grid[y][x] = 1);

    folds.forEach(([axis, num], i) => {
        let tempGrid: number[][] = [];
        if (axis === 'x') {
            grid.forEach(row => {
                let newRow: number[] = [];
                let maxCol: number = row.length - 1;
                for (let i = 0; i < num; i++) {
                    newRow.push(row[i] + row[maxCol - i] > 0 ? 1 : 0);
                }
                tempGrid.push(newRow);
            });
        } else if (axis === 'y') {
            let maxRow: number = grid.length - 1;
            for (let i = 0; i < num; i++) {
                let newRow: number[] = [];
                grid[i].forEach((val, j) => {
                    newRow.push(val + grid[maxRow - i][j] > 0 ? 1 : 0);
                });
                tempGrid.push(newRow);
            }
        }
        grid = tempGrid;
        if (i === 0) {
            p1 = grid.reduce((acc, row) => acc += row.reduce((acc, val) => acc += val , 0) , 0);
        }
    });
    
    const p2: string = grid.reduce((a, row) => {
        return a + row.reduce((a, v, i) => a += v == 1 ? 'X' : (i+1) % 5 == 0 ? '\t' : ' ', '') + '\n';
    }, '');

    console.log('\n\n' + p2);
    return [p1, '(see above)'];

}