import readLines from "../../utils/readLines";

type Matrix = (0 | 1)[][];
type Coords = [number, number];

const EXPANDER = 1000000;

const displayMatrix = (matrix: Matrix) => {
    matrix.forEach((row) => {
        console.log(row.map((char) => (char ? "#" : ".")).join(""));
    });
};

const expandSpace = (matrix: Matrix): [number[], number[]] => {
    const emptyRows: number[] = [];
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].every((value) => value == 0)) emptyRows.push(i);
    }

    const emptyCols: number[] = [];
    for (let j = 0; j < matrix[0].length; j++) {
        let isEmpty = true;
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][j]) {
                isEmpty = false;
                break;
            }
        }
        if (isEmpty) emptyCols.push(j);
    }

    return [emptyRows, emptyCols];
};

const findGalaxies = (matrix: Matrix) => {
    const galaxies: Coords[] = [];
    matrix.forEach((row, i) => {
        row.forEach((char, j) => {
            if (char) galaxies.push([i, j]);
        });
    });
    return galaxies;
};

const getDistance = (
    coordsA: Coords,
    coordsB: Coords,
    expandedRows: number[],
    expandedCols: number[]
) => {
    const [xA, yA] = coordsA;
    const [xB, yB] = coordsB;

    const exRows = expandedRows.filter((i) =>
        xA < xB ? i > xA && i < xB : i < xA && i > xB
    ).length;
    const exCols = expandedCols.filter((j) =>
        yA < yB ? j > yA && j < yB : j < yA && j > yB
    ).length;

    return (
        Math.abs(xA - xB) +
        Math.abs(yA - yB) +
        exRows * (EXPANDER - 1) +
        exCols * (EXPANDER - 1)
    );
};

const getTotalDistance = (
    galaxies: Coords[],
    expandedRows: number[],
    expandedCols: number[]
): number => {
    const coords = [...galaxies];
    let total = 0;

    while (coords.length > 0) {
        const start = coords.pop()!;
        for (let i = 0; i < coords.length; i++) {
            total += getDistance(start, coords[i], expandedRows, expandedCols);
        }
    }

    return total;
};

const matrix = readLines("input.txt").map((line) =>
    line.split("").map((char) => (char == "." ? 0 : 1))
) as Matrix;

const [expandedRows, expandedCols] = expandSpace(matrix);

const galaxies = findGalaxies(matrix);
console.log(getTotalDistance(galaxies, expandedRows, expandedCols));
