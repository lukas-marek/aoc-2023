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

const walk = (start: string, directions: string[], nodeMap: NodeMap): string[] => {
    let currentNode = start
    let steps: string[] = []

    do {
        const i = steps.length
        steps.push(currentNode)
        currentNode = directions[i % directions.length] == "L" ? nodeMap.get(currentNode)!.left : nodeMap.get(currentNode)!.right
    } while (!currentNode.endsWith("Z"))

    steps.shift()
    steps.push(currentNode)

    return steps
}

const [directionsInput, nodesInput] = readBlocks('input.txt')

const directions = directionsInput.split("")

const nodes = nodesInput.split('\n')
    .filter(input => input !== "")
    .map(parseNodeInput)

const nodeMap = createNodeMap(nodes)

const startNodes = [...nodeMap.keys()].filter(node => node.endsWith("A"))

const firstPaths = startNodes.map(node => walk(node, directions, nodeMap))
const cycles = firstPaths.map(n => walk(n[n.length - 1], directions, nodeMap))

const startLens = firstPaths.map(firstPaths => firstPaths.length)
const cyclesLen = cycles.map(cycle => cycle.length)

console.log(startLens, cyclesLen)