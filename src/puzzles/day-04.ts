/** https://adventofcode.com/2021/day/4 */

export function solvePuzzle4(input: string): [number, number] {

    const data: string[] = input.split('\n');
    data.push('');
    const nums: number[] = data[0].split(',').map(Number);
    let cards: number[][][][] = [];
    let card: number[][][] = [];

    for (let i = 2; i < data.length; i++) {
        let row: number[][] = data[i].trim().split(/[ ,]+/).map(x => [+x, 0]);
        if (row.length > 1) {
            card.push(row);
        } else {
            cards.push(card);
            card = [];
        }
    }

    const checkBingo = (cardIndex: number, rowIndex: number, colIndex: number): boolean => {
        const rowBingo: boolean = cards[cardIndex][rowIndex].reduce((acc, cell) => acc += cell[1], 0) === 5;
        const colBingo: boolean = cards[cardIndex].reduce((acc, row) => acc += row[colIndex][1], 0) === 5;
        return (rowBingo || colBingo);
    }

    const calcScore = (num: number, cardIndex: number): number => {
        const unmarkedSum: number = cards[cardIndex].reduce((acc, row) => {
            return acc += row.reduce((acc, cell) => acc += (cell[1] === 0 ? cell[0] : 0), 0)
        }, 0);
        return unmarkedSum * num;
    }

    function playBingo(): [number, number] {
        let firstBingoScore: number = 0;
        let cardsWithBingo: Set<number> = new Set();
        const numCards: number = cards.length;
        for (let i=0; i<nums.length; i++) {
            const num = nums[i];
            for(let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
                let card = cards[cardIndex];
                for (let rowIndex = 0; rowIndex < card.length; rowIndex++) {
                    let row = card[rowIndex];
                    for (let colIndex = 0; colIndex < row.length; colIndex++) {
                        if (row[colIndex][0] === num) {
                            row[colIndex][1] = 1;
                            if (checkBingo(cardIndex, rowIndex, colIndex)) {
                                if (firstBingoScore === 0) {
                                    firstBingoScore = calcScore(num, cardIndex);
                                }
                                cardsWithBingo.add(cardIndex);
                                if (cardsWithBingo.size === numCards) {
                                    return [firstBingoScore, calcScore(num, cardIndex)]
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return playBingo();
}