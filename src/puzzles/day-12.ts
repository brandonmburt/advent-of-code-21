/** https://adventofcode.com/2021/day/12 */

export function solvePuzzle12(input: string): [number, number] {

    let p1: number = 0, p2: number = 0;

    const isLowercase = (c: string): boolean => c === c.toLowerCase();

    let connections: Map<string, string[]> = new Map();
    input.split('\n').map(x => x.split('-')).forEach(([x, y]) => {
        connections.has(x) ? connections.get(x).push(y) : connections.set(x, [y]);
        connections.has(y) ? connections.get(y).push(x) : connections.set(y, [x]);
    });

    let toSearch: string[][] = [['start']];
    while (toSearch.length > 0) {
        let curr: string[] = toSearch.pop();
        let currEnd: string = curr[curr.length - 1];
        if (currEnd === 'end') {
            p1++;
            continue;
        }
        connections.get(currEnd).forEach(c => {
            if ((isLowercase(c) && curr.includes(c)) || c === 'start') {
                return;
            } else {
                toSearch.push([...curr, c]);
            }
        });
    }

    let toSearchP2: string[][] = [['start']];
    while (toSearchP2.length > 0) {
        let curr: string[] = toSearchP2.pop();
        let currEnd: string = curr[curr.length - 1];
        if (currEnd === 'end') {
            p2++;
            continue;
        }
        let counts: Map<string, number> = new Map();
        let doubleFound: boolean = false;
        curr.forEach(x => {
            let newVal: number = 1;
            if (counts.has(x)) {
                newVal += counts.get(x);
            }
            counts.set(x, newVal);
            if (x !== 'start' && isLowercase(x) && newVal >= 2) {
                doubleFound = true;
            }
        });
        connections.get(currEnd).forEach(c => {
            if (c === 'start') {
                return;
            } else if (isLowercase(c)) {
                if (counts.has(c) && counts.get(c) >= 2) {
                    return;
                } else if (doubleFound && counts.has(c) && counts.get(c) === 1) {
                    return;
                }
            }
            toSearchP2.push([...curr, c]);
        });
    }

    return [p1, p2];

}