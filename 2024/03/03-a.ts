import readLines from "../../utils/readLines";
import sum from "../../utils/sum";

const input = readLines("input.txt").join("");

const matcher = /mul\((\d+),(\d+)\)/g;
const total = [...input.matchAll(matcher)]
    .map(([_, a, b]) => parseInt(a) * parseInt(b))
    .reduce(sum);

console.log(total);
