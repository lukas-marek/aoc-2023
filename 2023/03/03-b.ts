import readLines from "../../utils/readLines";
import toNumber from "../../utils/toNumber";

type Matrix = string[];

type Coords = [number, number];
type PartNumber = { value: number; start: number; end: number };

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const lineToArray = (line: string): string[] => {
    return line.split("");
};

const findNumbersInRow = (row: string): PartNumber[] => {
    let start = -1; // index of start of current number (or -1)
    const result: PartNumber[] = [];
    row.split("").map((value, i) => {
        const isDigit = value in DIGITS;

        if (start == -1 && isDigit) {
            start = i;
        }

        if (start >= 0 && (!isDigit || i == row.length - 1)) {
            const end = i == row.length - 1 ? row.length : i;
            result.push({
                start: start,
                end: end,
                value: parseInt(row.substring(start, end)),
            });
            start = -1;
        }
    });

    return result;
};

const intervalIncludes = (x: number, intStart: number, intEnd: number) => {
    return intStart <= x && intEnd > x;
};

const getDigitsAround = (matrix: Matrix, coords: Coords): PartNumber[] => {
    const [x, y] = coords;

    let rowsToConsider: string[] = [];
    if (x != 0) rowsToConsider.push(matrix[x - 1]);
    rowsToConsider.push(matrix[x]);
    if (x != matrix.length - 1) rowsToConsider.push(matrix[x + 1]);

    console.log(coords, rowsToConsider);
    const digitsAround = rowsToConsider
        .map((row) => findNumbersInRow(row))
        .reduce((res, curr) => [...res, ...curr], [])
        .filter(
            ({ start, end }) =>
                intervalIncludes(y, start, end) ||
                intervalIncludes(y - 1, start, end) ||
                intervalIncludes(y + 1, start, end)
        );

    return digitsAround;
};

const findGears = (matrix: Matrix): Coords[] => {
    const gears: Coords[] = [];
    matrix.forEach((row, i) => {
        row.split("").forEach((_, j) => {
            if (input[i][j] == "*") {
                gears.push([i, j]);
            }
        });
    });
    return gears;
};

const input = readLines("input.txt");

const gears = findGears(input)
    .map((gear) => getDigitsAround(input, gear))
    .filter((gears) => gears.length === 2)
    .map((gears) => gears[0].value * gears[1].value)
    .reduce((sum, curr) => sum + curr, 0);

console.log(gears);
