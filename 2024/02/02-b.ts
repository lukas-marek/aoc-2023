import readLines from "../../utils/readLines";

const input = readLines("input.txt");

const numbers = input.map((line) => line.split(/\s+/).map((s) => parseInt(s)));

const isSafe = (line: number[]) => {
    const diffs: number[] = [];
    for (var n = 0; n <= line.length - 2; n++) {
        diffs.push(line[n + 1] - line[n]);
    }

    return (
        (diffs.every((num) => num < 0) || diffs.every((num) => num > 0)) &&
        diffs.every((num) => Math.abs(num) >= 1 && Math.abs(num) <= 3)
    );
};

const filtered = numbers.filter((line) => {
    if (isSafe(line)) {
        return true;
    }

    for (var i = 0; i < line.length; i++) {
        const skipped = line.filter((_, j) => j != i);
        if (isSafe(skipped)) {
            return true;
        }
    }

    return false;
});

console.log(filtered.length);
