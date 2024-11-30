import readLines from "../../utils/readLines";
import toNumber from "../../utils/toNumber";

class Card {
    id: number;
    winning: number[];
    actual: number[];
    copies: number;

    constructor(
        id: number,
        winning: number[],
        actual: number[],
        copies: number = 0
    ) {
        this.id = id;
        this.winning = winning;
        this.actual = actual;
        this.copies = copies;
    }

    getMatches = () => {
        return this.actual.filter((number) => this.winning.includes(number));
    };

    getNumberOfMatches = () => {
        return this.getMatches().length;
    };
}

const parseCard = (input: string): Card => {
    const [header, numbers] = input.split(/:\s+/);
    const id = header.charAt(5);

    let [winning, actual] = numbers.split(/\s+\|\s+/);

    return new Card(
        toNumber(id),
        winning.split(/\s+/).map(toNumber),
        actual.split(/\s+/).map(toNumber)
    );
};

const input = readLines("input.txt");

const cards = input.map(parseCard);

let processed = 0;
while (cards.length > 0) {
    const card = cards.shift()!;
    const matches = card.getNumberOfMatches();
    cards
        .slice(0, matches)
        .forEach((c) => (c.copies = c.copies + card.copies + 1));
    processed = processed + card.copies + 1;
}

console.log(processed);
