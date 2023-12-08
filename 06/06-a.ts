const getHoldTimeInterval = (time: number, distance: number): number[] => {
    const d = Math.pow(time, 2) - (4 * distance)
    const r1 = (-time - Math.sqrt(d)) / (-2)
    const r2 = (-time + Math.sqrt(d)) / (-2)
    return [r1, r2].sort((a, b) => a - b)
}

const getIntegerSolutions = (rangeStart: number, rangeEnd: number): number[] => {
    const intStart = Math.ceil(rangeStart)
    const intEnd = Math.floor(rangeEnd)
    let solutions = Array(intEnd - intStart + 1).fill(0).map((_, i) => i + intStart)
    if (solutions[0] == rangeStart) solutions.shift()
    if (solutions[solutions.length - 1] == rangeEnd) solutions.pop()
    return solutions
}

const examples = [[7, 9], [15, 40], [30, 200]]
const p1 = [[55, 401], [99, 1485], [97, 2274], [93, 1405]]
const p2 = [[55999793, 401148522741405]]

const result = p2
    .map(([time, distance]) => getHoldTimeInterval(time, distance))
    .map(([start, end]) => getIntegerSolutions(start, end))
    .map(solutions => solutions.length)
    .reduce((total, current) => total * current, 1)

console.log(result)