import readLines from "../../utils/readLines";

const input = readLines("input.txt");

const numbers = input.map((line) => line.split(/\s+/).map((s) => parseInt(s)));

const transformed = numbers.map((line) => {
    const diffs: number[] = [];
    for (var i = 0; i <= line.length - 2; i++) {
        diffs.push(line[i + 1] - line[i]);
    }
    return diffs;
});

const filtered = transformed.filter(
    (line) =>
        (line.every((num) => num < 0) || line.every((num) => num > 0)) &&
        line.every((num) => Math.abs(num) >= 1 && Math.abs(num) <= 3)
);

console.log(filtered.length);
