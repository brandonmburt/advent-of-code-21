/** https://adventofcode.com/2021/day/1 */

export function solvePuzzle1(input: string): [number, number] {

    let data: number[] = input.split('\n').map(Number);

    const increaseCount = (arr: number[]): number => arr.reduce((acc, v, i) => !!arr[i+1] ? acc + +(arr[i+1]>v) : acc, 0);

    let p2Data: number[] = [];
    for (let i = 0; i < input.length - 2; i++) {
        p2Data.push(data[i] + data[i+1] + data[i+2]);
    }

    return [increaseCount(data), increaseCount(p2Data)];

}