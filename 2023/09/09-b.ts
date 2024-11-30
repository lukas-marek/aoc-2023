import readLines from "../../utils/readLines";
import sum from "../../utils/sum";
import toNumber from "../../utils/toNumber";

const getDiffs = (values: number[]) => {
    const res: number[] = [];
    for (var i = 0; i <= values.length - 2; i++) {
        res.push(values[i + 1] - values[i]);
    }
    return res;
};

const isConstant = (values: number[]) => {
    return values.every((value) => value === values[0]);
};

const getPrevNumber = (values: number[]) => {
    const steps: number[] = [values[0]];

    let current = [...values];
    while (!isConstant(current)) {
        current = getDiffs(current);
        steps.push(current[0]);
    }

    let res = steps.pop() || 0;
    for (var i = steps.length - 1; i >= 0; i--) {
        res = steps[i] - res;
    }

    return res;
};

const input = readLines("input.txt");

const measurements = input.map((line) => line.split(" ").map(toNumber));

const res = measurements.map((m) => getPrevNumber(m)).reduce(sum, 0);

console.log(res);
