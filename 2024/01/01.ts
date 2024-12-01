import readLines from "../../utils/readLines";
import sum from "../../utils/sum";

const input = readLines("input.txt");

const numbers = input.map((line) => line.split(/\s+/).map((s) => parseInt(s)));

const A = numbers.map(([a]) => a);
const B = numbers.map(([_, b]) => b);

A.sort();
B.sort();

const indexes = Array.from(Array(A.length).keys());

const partA = indexes.map((i) => Math.abs(A[i] - B[i])).reduce(sum);

console.log("Part A: ", partA);

const partB = A.map((n) => {
    return n * B.filter((m) => m == n).length;
}).reduce(sum);

console.log("Part B: ", partB);
