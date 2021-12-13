/** https://adventofcode.com/2021/day/9 */

export function solvePuzzle9(input: string): [number, number] {

    let p1: number = 0, p2: number = 0;
    let lowPoints: number[][] = [];
    let basinSizes: number[] = [];

    const data: number[][] = input.split('\n').map(x => x.split('').map(Number));

    const isLessThan = (num: number, row: number, col: number): boolean => {
        return data[row] === undefined || data[row][col] === undefined ? true : data[row][col] > num;
    }

    const getAdjCoords = (row: number, col: number): number[][] => {
        let coords: number[][] = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];
        return coords.filter(c => isValidCoord(c[0], c[1]));
    }

    const isValidCoord = (row: number, col: number) => {
        return data[row] === undefined || data[row][col] === undefined ? false : true;
    }

    const isBasinCoord = (row: number, col: number): boolean => {
        return !isValidCoord(row, col) || data[row][col] === 9 ? false : true;
    }

    data.forEach((arr, row) => {
        arr.forEach((val, col) => {
            if (isLessThan(val, row-1, col) && isLessThan(val, row+1, col) &&
                isLessThan(val, row, col-1) && isLessThan(val, row, col+1)) {
                    p1 += (val + 1);
                    lowPoints.push([row, col]);
            }
        })
    });

    lowPoints.forEach(coord => {
        let [x, y] = coord;
        let basinCoords: number[][] = [coord];
        let coordsToCheck: number[][] = getAdjCoords(x, y);
        let checkedCoords: number[][] = [coord];
        do {
            let [row, col] = coordsToCheck.shift();
            checkedCoords.push([row, col]);
            if (isBasinCoord(row, col)) {
                if (!basinCoords.find(x => x[0] === row && x[1] === col)) {
                    basinCoords.push([row, col]);
                }
                getAdjCoords(row, col).forEach(c => {
                    if (!checkedCoords.find(x => x[0] === c[0] && x[1] === c[1])) {
                        coordsToCheck.push(c);
                    }
                });
            }
        } while (coordsToCheck.length > 0);
        basinSizes.push(basinCoords.length);
    });

    basinSizes.sort((a, b) => b - a);
    p2 = basinSizes[0] * basinSizes[1] * basinSizes[2];

    return [p1, p2];

}