package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Node struct {
	left  string
	right string
}

type NodeMap map[string]Node

type Directions []string

func load(fileName string) (Directions, NodeMap) {
	data, err := os.Open(fileName)
	if err != nil {
		panic(err)
	}

	fileScanner := bufio.NewScanner(data)
	fileScanner.Split(bufio.ScanLines)

	fileScanner.Scan()
	directions := strings.Split(fileScanner.Text(), "")
	fileScanner.Scan()

	nodeMap := NodeMap{}
	for fileScanner.Scan() {
		line := fileScanner.Text()
		nodeMap[line[0:3]] = Node{
			left:  line[7:10],
			right: line[12:15],
		}
	}
	fmt.Println(nodeMap)
	return directions, nodeMap
}

func walk(directions Directions, nodeMap NodeMap) int {
	currentNodes := make([]string, 0, len(nodeMap))
	for key := range nodeMap {
		if key[2] == 'A' {
			currentNodes = append(currentNodes, key)
		}
	}
	steps := 0

	for {
		direction := directions[steps%len(directions)]
		for i := range currentNodes {
			if direction == "R" {
				currentNodes[i] = nodeMap[currentNodes[i]].right
			} else {
				currentNodes[i] = nodeMap[currentNodes[i]].left
			}
		}
		steps++
		stop := true
		for _, node := range currentNodes {
			if node[2] != 'Z' {
				stop = false
			}
		}
		if stop {
			return steps
		}
		if steps%100000000 == 0 {
			fmt.Println(steps, currentNodes)
		}
	}
	return 0
}

func main() {
	d, m := load("input.txt")
	steps := walk(d, m)
	fmt.Println(steps)
}
