import readLines from "../../utils/readLines";
import toNumber from "../../utils/toNumber";

const CARDS = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const compareCards = (cardA: string, cardB: string) =>
    CARDS.indexOf(cardA) - CARDS.indexOf(cardB);

const handType = (hand: string) => {
    const cards = hand.split("");
    const distinctCards = new Set(cards);
    const counts = [...distinctCards]
        .map((card) => cards.filter((c) => c === card).length)
        .sort((a, b) => b - a)
        .join("");
    switch (counts) {
        case "5":
            return 7;
        case "41":
            return 6;
        case "32":
            return 5;
        case "311":
            return 4;
        case "221":
            return 3;
        case "2111":
            return 2;
        case "11111":
            return 1;
    }
    throw new Error("Invalid card counts: " + counts);
};

const compareHands = (handA: string, handB: string) => {
    const handAtype = handType(handA);
    const handBtype = handType(handB);

    if (handAtype == handBtype) {
        for (let i = 0; i < 5; i++) {
            const comp = compareCards(handA[i], handB[i]);
            if (comp != 0) return comp;
        }
        throw new Error("Tie");
    }

    return handBtype - handAtype;
};

const hands = readLines("input.txt")
    .map((row) => row.split(" "))
    .map(([hand, bid]) => [hand, toNumber(bid)] as [string, number])
    .sort(([handA], [handB]) => -compareHands(handA, handB))
    .map(([_, bid]) => bid)
    .reduce((total, current, i) => total + current * (i + 1), 0);

console.log(hands);
