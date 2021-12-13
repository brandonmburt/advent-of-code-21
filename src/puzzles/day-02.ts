/** https://adventofcode.com/2021/day/2 */

export function solvePuzzle2(input: string): [number, number] {

    let horizontal: number = 0;
    let depthP1: number = 0, depthP2: number = 0;
    let aim: number = 0;

    input.split('\n').forEach(x => {
        let [direction, val] = x.split(' ');
        switch (direction) {
            case 'forward':
                horizontal += +val;
                depthP2 += (+val * aim);
                break;
            case 'up':
                depthP1 -= +val;
                aim -= +val;
                break;
            case 'down':
                depthP1 += +val;
                aim += +val;
                break;
            default:
                return;
        }
    });

    return [horizontal * depthP1, horizontal * depthP2];
}