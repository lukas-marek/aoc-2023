import readBlocks from '../utils/readBlocks'

type Node = {
    name: string
    left: string
    right: string
}

type NodeMap = Map<string, { right: string, left: string }>

const parseNodeInput = (input: string): Node => {
    const [_, name, left, right] = input.match(/(\w{3}) = \((\w{3}), (\w{3})\)/)!
    return {
        name, left, right
    }
}

const createNodeMap = (nodes: Node[]): NodeMap => {
    const map: NodeMap = new Map()
    nodes.forEach(({ name, left, right }) => map.set(name, { left, right }))
    return map
}

const walk = (directions: string[], nodeMap: NodeMap): number => {
    let currentNodes = [...nodeMap.keys()].filter(key => key.endsWith("A"))
    let steps: number = 0

    while (!currentNodes.every(key => key.endsWith("Z"))) {
        const direction = directions[steps % directions.length]
        currentNodes = currentNodes.map(node => direction == "L" ? nodeMap.get(node)!.left : nodeMap.get(node)!.right)
        steps++
        if (steps % 1000000 == 0) {
            console.log(steps, currentNodes)
        }
    }

    return steps
}

const [directionsInput, nodesInput] = readBlocks('input.txt')

const directions = directionsInput.split("")

const nodes = nodesInput.split('\n')
    .filter(input => input !== "")
    .map(parseNodeInput)

const nodeMap = createNodeMap(nodes)

const steps = walk(directions, nodeMap)

console.log(steps)