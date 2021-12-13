/** https://adventofcode.com/2021/day/6 */

export function solvePuzzle6(input: string): [number, number] {

    let fish: number[] = input.split(',').map(Number);

    function calcFish(days: number): number {
        let counts: number[] = new Array<number>(9).fill(0);

        fish.forEach(f => {
            counts[f]++;
        });

        for (let i=0; i<days; i++) {
            let zeros: number = counts.shift();
            counts[6] += zeros;
            counts.push(zeros);
        }

        return counts.reduce((acc, c) => acc += c, 0);
    }

    return [calcFish(80), calcFish(256)];
}