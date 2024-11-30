import readLines from "../../utils/readLines";
import sum from "../../utils/sum";

const hashString = (str: string) => {
    return str
        .split("")
        .reduce((hash, char) => ((hash + char.charCodeAt(0)) * 17) % 256, 0);
};

const input = readLines("./input.txt")[0];

const result = input.split(",").map(hashString);

console.log(result.reduce(sum, 0));
