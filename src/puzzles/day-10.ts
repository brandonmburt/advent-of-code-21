/** https://adventofcode.com/2021/day/10 */

export function solvePuzzle10(input: string): [number, number] {

    let p1: number = 0, p2: number = 0;
    let scores: number[] = [];

    const brackets: Map<string, string> = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']]);
    const openChars: string[] = [...brackets.keys()];
    const increments: Map<string, { p1: number, p2: number }> = new Map([
        [')', { p1: 3, p2: 1 }],
        [']', { p1: 57, p2: 2 }],
        ['}', { p1: 1197, p2: 3 }],
        ['>', { p1: 25137, p2: 4 }]
    ]);

    input.split('\n').forEach(line => {

        let chars: string[] = line.split(''), len: number = chars.length;
        let stack: string[] = [];
        let incompleteLines: string[][] = [];

        for (let i = 0; i < len; i++) {
            let char: string = chars[i];
            if (openChars.includes(char)) {
                stack.push(char);
            } else {
                if (brackets.get(stack[stack.length-1]) === char) {
                    stack.pop();
                } else {
                    p1 += increments.get(char).p1;
                    break;
                }
            }
            if (i === len-1) {
                incompleteLines.push(stack);
            }
        }
        incompleteLines.forEach(line => {
            let score: number = 0, len: number = line.length;
            for (let i = 0; i < len; i++) {
                score = (score * 5) + increments.get(brackets.get(line.pop())).p2;
            }
            scores.push(score);
        });
    });

    scores = scores.sort((a, b) => a - b);
    p2 = scores[Math.round(scores.length/2) - 1];

    return [p1, p2];

}