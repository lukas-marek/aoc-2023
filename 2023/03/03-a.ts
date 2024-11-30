import readLines from "../../utils/readLines";

type Matrix = string[][];
type PartNumber = { value: number; start: number; end: number };
type PartNumberWithRow = PartNumber & { row: number };

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const hasSymbolAround = (matrix: Matrix, partNumber: PartNumberWithRow) => {
    const { row, start, end } = partNumber;
    const cols = matrix[0].length;

    const iBefore = start == 0 ? start : start - 1;
    const iAfter = end == cols ? end : end + 1;

    const symbolsAround: string[] = [];

    if (row > 0) {
        const above = matrix[row - 1].slice(iBefore, iAfter);
        symbolsAround.push(...above);
    }

    if (start != 0) symbolsAround.push(matrix[row][iBefore]);
    if (end != cols) symbolsAround.push(matrix[row][iAfter - 1]);

    if (row < matrix.length - 1) {
        const below = matrix[row + 1].slice(iBefore, iAfter);
        symbolsAround.push(...below);
    }

    return symbolsAround.some(
        (symbol) => symbol !== "." && !DIGITS.includes(symbol)
    );
};

const findNumbersInRow = (row: string[]): PartNumber[] => {
    let start = -1; // index of start of current number (or -1)
    const result: PartNumber[] = [];
    row.map((value, i) => {
        const isDigit = value in DIGITS;

        if (start == -1 && isDigit) {
            start = i;
        }

        if (start >= 0 && (!isDigit || i == row.length - 1)) {
            const end = i == row.length - 1 ? row.length : i;
            result.push({
                start: start,
                end: end,
                value: parseInt(row.slice(start, end).join("")),
            });
            start = -1;
        }
    });

    return result;
};

const lineToArray = (line: string): string[] => {
    return line.split("");
};

const input = readLines("input.txt").map(lineToArray);

const matrix = input
    .map((line) => findNumbersInRow(line))
    .map((partNumbers, i) =>
        partNumbers.map((partNumber) => ({ row: i, ...partNumber }))
    );

const parts = matrix.reduce((res, partNumbers) => [...res, ...partNumbers], []);

const result = parts
    .map((part) => ({ ...part, hasSymbol: hasSymbolAround(input, part) }))
    .filter(({ hasSymbol }) => hasSymbol)
    .reduce((sum, { value }) => sum + value, 0);

console.log(result);
