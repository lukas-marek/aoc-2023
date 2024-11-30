import { start } from "repl";
import readLines from "../../utils/readLines";

type Matrix = string[][];
type Coords = [number, number];

const PIPES = ["|", "-", "L", "J", "7", "F"] as const;
const DIRECTIONS = ["N", "E", "S", "W"] as const;

type Pipe = (typeof PIPES)[number];
type Direction = (typeof DIRECTIONS)[number];
type ConnectionMap = { [key in Pipe]: [Direction, Direction] };

const connections: ConnectionMap = {
    "|": ["N", "S"],
    "-": ["E", "W"],
    L: ["N", "E"],
    J: ["N", "W"],
    "7": ["S", "W"],
    F: ["S", "E"],
};

const opposingDirections: { [key in Direction]: Direction } = {
    N: "S",
    W: "E",
    E: "W",
    S: "N",
};

const getStartPosition = (matrix: Matrix): Coords => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "S") {
                return [i, j];
            }
        }
    }
    throw new Error("No starting position found");
};

const isPipe = (symbol: string): boolean => {
    return PIPES.includes(symbol as Pipe);
};

const getConnectedPipe = (
    matrix: Matrix,
    coords: Coords,
    direction: Direction
):
    | { pipe: Pipe; coords: Coords; nextDirection: Direction }
    | undefined
    | null => {
    const [i, j] = coords;

    let nextCoords: Coords | null = null;

    // North
    if (direction == "N" && i > 0) {
        nextCoords = [i - 1, j];
    }
    if (direction == "E" && j < matrix[0].length - 1) {
        nextCoords = [i, j + 1];
    }
    if (direction == "W" && j > 0) {
        nextCoords = [i, j - 1];
    }
    if (direction == "S" && i < matrix.length - 1) {
        nextCoords = [i + 1, j];
    }

    if (nextCoords === null) return undefined;
    const pipeCandidate = matrix[nextCoords[0]][nextCoords[1]];

    if (pipeCandidate == "S") {
        return null;
    }

    if (!isPipe(pipeCandidate)) return null;

    const pipe: Pipe = pipeCandidate as Pipe;
    const connection = connections[pipe];
    if (connection.includes(opposingDirections[direction])) {
        const nextDirection = connection.find(
            (c) => c != opposingDirections[direction]
        )!;
        return { pipe, coords: nextCoords, nextDirection: nextDirection };
    }

    return undefined;
};

const findEnclosedTiles = (matrix: Matrix, path: Coords[]) => {
    let enclosedTiles: Coords[] = [];
    for (let i = 0; i < matrix.length; i++) {
        const pipesInRow = path.filter(([x, y]) => x == i);

        let inside = false;
        let openPipe = "";

        for (let j = 0; j < matrix[i].length; j++) {
            const pipe = pipesInRow?.find(([x, y]) => y == j);
            if (!pipe) {
                if (inside) enclosedTiles.push([i, j]);
                continue;
            }

            const pipeSymbol = matrix[pipe[0]][pipe[1]];
            if (pipeSymbol == "-") continue;
            if (pipeSymbol == "L" || pipeSymbol == "F") {
                openPipe = pipeSymbol;
                continue;
            }

            if (
                (openPipe == "L" && pipeSymbol == "J") ||
                (openPipe == "F" && pipeSymbol == "7")
            ) {
                openPipe = "";
                continue;
            }

            inside = !inside;
        }
    }

    return enclosedTiles;
};

const getSymbolBetween = (
    directionIn: Direction,
    directionOut: Direction
): Pipe => {
    // TODO!!
};

const matrix = readLines("input.txt").map((line) => line.split(""));

const startPosition = getStartPosition(matrix);

const firstPipe = DIRECTIONS.map((d) =>
    getConnectedPipe(matrix, startPosition, d)
).filter((p) => p)[0]!;

let currentPosition = firstPipe.coords;
let currentDirection = firstPipe.nextDirection;
let steps: Coords[] = [];

while (true) {
    steps.push(currentPosition);
    const result = getConnectedPipe(matrix, currentPosition, currentDirection);
    if (result === null || result === undefined) break;
    currentDirection = result.nextDirection;
    currentPosition = result.coords;
}

steps = [startPosition, ...steps];

// Replace start symbol with propper pipe symbol
matrix[startPosition[0]][startPosition[1]] = "L";

console.log(steps.length / 2);

console.log(findEnclosedTiles(matrix, steps).length);
