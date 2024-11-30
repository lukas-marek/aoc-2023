import readLines from "../../utils/readLines";
import sum from "../../utils/sum";
import toNumber from "../../utils/toNumber";

const hashString = (str: string) => {
    return str
        .split("")
        .reduce((hash, char) => ((hash + char.charCodeAt(0)) * 17) % 256, 0);
};

type Lens = {
    label: string;
    focalLength: number;
};

type Boxes = {
    [key: number]: Lens[];
};

const initialize = (operations: string[]) => {
    const boxes: Boxes = Array(256)
        .fill(0)
        .map((_, i) => i)
        .reduce((boxes, index) => ({ ...boxes, [index]: [] }), {});

    operations.forEach((operation) => {
        if (operation.includes("=")) {
            // Add lens
            const [label, rawfocalLength] = operation.split("=");
            const focalLength = toNumber(rawfocalLength);
            const box = hashString(label);
            if (boxes[box].find((lens) => lens.label == label)) {
                boxes[box].find((lens) => lens.label == label)!.focalLength =
                    focalLength;
            } else {
                boxes[box].push({ label, focalLength });
            }
        } else {
            const label = operation.substring(0, operation.length - 1);
            const box = hashString(label);
            boxes[box] = boxes[box].filter((lens) => lens.label != label);
        }
    });

    return boxes;
};

const getFocusingPower = (boxNumber: number, lenses: Lens[]) => {
    return lenses.reduce(
        (total, lens, i) =>
            total + (boxNumber + 1) * (i + 1) * lens.focalLength,
        0
    );
};

const input = readLines("./input.txt")[0];
const boxes = initialize(input.split(","));

const focusingPowers = Object.keys(boxes)
    .map((box) => toNumber(box))
    .map((box) => getFocusingPower(box, boxes[box]));

console.log(focusingPowers.reduce(sum, 0));
