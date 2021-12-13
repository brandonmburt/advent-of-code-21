/** https://adventofcode.com/2021/day/9 */

export function solvePuzzle8(input: string): [number, number] {

    let p1: number = 0, p2: number = 0;

    // Indices correspond with the number these strings represent on a seven-segment display
    const standard: string[] = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];

    input.split('\n').map(row => {
        let [patterns, output] = row.split(' | ').map(x => x.split(' '));
        output = output.map(y => y.split('').sort().join(''));

        const fourStr: string = patterns.find(x => x.length === 4);
        let charMap: Map<string, { count: number, conv: string }> = new Map();
        'abcdefg'.split('').forEach(c => charMap.set(c, { count: 0, conv: '' }));
        
        patterns.forEach(x => x.split('').forEach(c => charMap.get(c).count++));

        charMap.forEach((val, key) => {
            switch (val.count) {
                case 4:
                    charMap.get('e').conv = key;
                    break;
                case 6:
                    charMap.get('f').conv = key;
                    break;
                case 9:
                    charMap.get('c').conv = key;
                    break;
                case 8:
                    charMap.get(fourStr.indexOf(key) >= 0 ? 'b' : 'a').conv = key;
                    break;
                case 7:
                    charMap.get(fourStr.indexOf(key) >= 0 ? 'g': 'd').conv = key;
                    break;
            }
        });
        const conversions: string[] = standard.map(x => {
            return x.split('').map(y => charMap.get(y).conv).sort().join('');
        });

        p1 += output.filter(x => [2, 3, 4, 7].includes(x.length)).length;
        p2 += +output.reduce((a, x) => a += conversions.indexOf(x).toString(), '');
    });

    return [p1, p2];

}