/** https://adventofcode.com/2021/day/7 */

export function solvePuzzle7(input: string): [number, number] {

    let data: number[] = input.split(',').map(Number);

    const min: number = Math.min(...data);
    const max: number = Math.max(...data);
    let fuelSumsP1: number[] = [], fuelSumsP2: number[] = [];

    for (let i = min; i <= max; i++) {
        fuelSumsP1.push(data.reduce((sum, n) => sum + Math.abs(n-i), 0));
        fuelSumsP2.push(data.reduce((sum, n) => sum + (Math.abs(n-i) * (Math.abs(n-i) + 1) / 2) , 0));
    }

    return [Math.min(...fuelSumsP1), Math.min(...fuelSumsP2)];

}