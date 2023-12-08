import readLines from "../utils/readLines";
import toNumber from "../utils/toNumber";

class Card {
    id: number
    winning: number[]
    actual: number[]

    constructor(id: number, winning: number[], actual: number[]) {
        this.id = id
        this.winning = winning
        this.actual = actual
    }

    getMatches = () => {
        return this.actual.filter(number => this.winning.includes(number))
    }

    getNumberOfMatches = () => {
        return this.getMatches().length
    }
}

const parseCard = (input: string): Card => {
    const [header, numbers] = input.split(/:\s+/)
    const id = header.charAt(5)

    let [winning, actual] = numbers.split(/\s+\|\s+/)

    return new Card(toNumber(id), winning.split(/\s+/).map(toNumber), actual.split(/\s+/).map(toNumber))
}

const input = readLines("input.txt")

const result = input
    .map(parseCard)
    .filter(card => card.getNumberOfMatches() > 0)
    .map(card => 2 ** (card.getNumberOfMatches() - 1))
    .reduce((sum, current) => sum + current, 0)

console.log(result)