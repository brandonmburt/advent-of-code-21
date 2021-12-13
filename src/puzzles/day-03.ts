/** https://adventofcode.com/2021/day/3 */

export function solvePuzzle3(input: string): [number, number] {

    const decimalProduct = (binaryOne: string, binaryTwo: string): number => parseInt(binaryOne, 2) * parseInt(binaryTwo, 2);

    const data: string[] = input.split('\n');
    let counts: number[] = new Array(data[0].length).fill(0);
    
    data.forEach(x => {
        x.split('').forEach((bit, i) => {
            counts[i] = counts[i] + +bit;
        });
    });

    let binary: string = counts.reduce((acc, count) => acc += (count > (data.length-count)) ? "1" : "0", "");
    let inverse: string = binary.split('').reduce((acc, bit) => acc += (bit == "1") ? "0" : "1", "");

    let optionsCO2: string[] = data, optionsOxygen: string[] = data;

    for (let i = 0; i < data[0].length; i++) {
        let ones: number = 0, zeros: number = 0;
        
        if (optionsCO2.length > 1) {
            ones = optionsCO2.reduce((acc, option) => option[i] === "1" ? acc += 1 : acc, 0);
            let mostCommon: string = ones >= (optionsCO2.length-ones) ? "1" : "0";
            optionsCO2 = optionsCO2.filter(option => option[i] === mostCommon);
        }

        if (optionsOxygen.length > 1) {
            zeros = optionsOxygen.reduce((acc, option) => option[i] === "0" ? acc += 1 : acc, 0);
            let leastCommon: string = zeros <= (optionsOxygen.length-zeros) ? "0" : "1";
            optionsOxygen = optionsOxygen.filter(option => option[i] === leastCommon);
        }
    }

    return [decimalProduct(binary, inverse), decimalProduct(optionsCO2[0], optionsOxygen[0])];
}