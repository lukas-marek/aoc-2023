import readLines from "../utils/readLines";
import toNumber from "../utils/toNumber";

const CARDS = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

const compareCards = (cardA: string, cardB: string) => CARDS.indexOf(cardA) - CARDS.indexOf(cardB)

const handType = (hand: string) => {
    const cards = hand.split("")
    const jokers = cards.filter(card => card === "J").length
    const otherCards = cards.filter(card => card !== "J")
    const distinctCards = new Set(otherCards)
    const counts = [...distinctCards].map(card => cards.filter(c => c === card).length).sort((a, b) => b - a).join("")
    if (counts == "5" || counts == "4" && jokers == 1 || counts == "3" && jokers == 2 || counts == "2" && jokers == 3 || counts == "1" && jokers == 4 || counts == "" && jokers == 5)
        return 7;
    if (counts == "41" || counts == "31" && jokers == 1 || counts == "21" && jokers == 2 || counts == "11" && jokers == 3)
        return 6;
    if (counts == "32" || counts == "22" && jokers == 1)
        return 5;
    if (counts == "311" || counts == "211" && jokers == 1 || counts == "111" && jokers == 2)
        return 4;
    if (counts == "221")
        return 3;
    if (counts == "2111" || counts == "1111" && jokers == 1)
        return 2;

    return 1;
}

const compareHands = (handA: string, handB: string) => {
    const handAtype = handType(handA)
    const handBtype = handType(handB)

    if (handAtype == handBtype) {
        for (let i = 0; i < 5; i++) {
            const comp = compareCards(handA[i], handB[i])
            if (comp != 0) return comp
        }
        throw new Error("Tie")
    }

    return handBtype - handAtype
}

const hands = readLines('input.txt')
    .map(row => row.split(" "))
    .map(([hand, bid]) => [hand, toNumber(bid)] as [string, number])
    // .map(([hand]) => handType(hand))
    .sort(([handA], [handB]) => -compareHands(handA, handB))
    .map(([_, bid]) => bid)
    .reduce((total, current, i) => total + current * (i + 1), 0)


console.log(hands)