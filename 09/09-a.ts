import readLines from "../utils/readLines";
import sum from "../utils/sum";
import toNumber from "../utils/toNumber";

const getDiffs = (values: number[]) => {
    const res: number[] = []
    for (var i = 0; i <= values.length - 2; i++) {
        res.push(values[i + 1] - values[i])
    }
    return res
}

const isConstant = (values: number[]) => {
    return values.every(value => value === values[0])
}

const getNextNumber = (values: number[]) => {
    const steps: number[] = [values[values.length - 1]]

    let current = [...values]
    while (!isConstant(current)) {
        current = getDiffs(current)
        steps.push(current[current.length - 1])
    }

    return steps.reduce(sum, 0)
}

const input = readLines("input.txt")

const measurements = input.map(line => line.split(" ").map(toNumber))

const res = measurements
    .map(m => getNextNumber(m))
    .reduce(sum, 0)

console.log(res)