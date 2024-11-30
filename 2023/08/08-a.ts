import readBlocks from "../../utils/readBlocks";

type Node = {
    name: string;
    left: string;
    right: string;
};

type NodeMap = {
    [name: string]: {
        right: string;
        left: string;
    };
};

const parseNodeInput = (input: string): Node => {
    const [_, name, left, right] = input.match(
        /(\w{3}) = \((\w{3}), (\w{3})\)/
    )!;
    return {
        name,
        left,
        right,
    };
};

const createNodeMap = (nodes: Node[]): NodeMap => {
    const map: NodeMap = {};
    nodes.forEach(({ name, left, right }) => (map[name] = { left, right }));
    return map;
};

const walk = (directions: string[], nodeMap: NodeMap): string[] => {
    let currentNode = "AAA";
    let steps: string[] = [];

    while (currentNode !== "ZZZ") {
        const i = steps.length;
        steps.push(currentNode);
        const direction = directions[i % directions.length];
        if (direction === "L") {
            currentNode = nodeMap[currentNode].left;
        } else {
            currentNode = nodeMap[currentNode].right;
        }
    }

    steps.push("ZZZ");
    return steps;
};

const [directionsInput, nodesInput] = readBlocks("input.txt");

const directions = directionsInput.split("");

const nodes = nodesInput
    .split("\n")
    .filter((input) => input !== "")
    .map(parseNodeInput);

const nodeMap = createNodeMap(nodes);

const steps = walk(directions, nodeMap);

console.log(steps.length - 1);
