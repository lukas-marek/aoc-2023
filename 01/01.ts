import fs from 'fs';
import readLines from '../utils/readLines';

const DIGIT_MAP = {
    'one': 'o1e',
    'two': 't2o',
    'three': 't3e',
    'four': 'f4r',
    'five': 'f5e',
    'six': 's6x',
    'seven': 's7n',
    'eight': 'e8t',
    'nine': 'n9e'
}

const DIGITS = Object.keys(DIGIT_MAP)

const convertDigits = (line: string): string => {
    let result = line
    for (let i = 0; i < result.length; i++) {
        const substr = result.slice(i);
        const digit = DIGITS.find(d => substr.startsWith(d))
        if (!digit) continue
        result = result.slice(0, i) + DIGIT_MAP[digit as keyof typeof DIGIT_MAP] + result.slice(i + digit.length)
    }
    return result
}

const input = readLines('input.txt')
const result = input
    .map(convertDigits)

    .map(line => line.replace(/\D/g, ""))
    .map(digits => `${digits[0]}${digits[digits.length - 1]}`)
    .map(number => Number(number))
    .reduce((sum, number) => sum + number, 0)

console.log(result)