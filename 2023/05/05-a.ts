import readBlocks from "../../utils/readBlocks";
import toNumber from "../../utils/toNumber";

type Range = {
    start: number;
    end: number;
};

type MappingInput = {
    destinationStart: number;
    sourceStart: number;
    range: number;
};

type MappingRule = {
    sourceStart: number;
    sourceEnd: number;
    shift: number;
};

class Mapping {
    mappingRules: MappingRule[];

    constructor(inputs: MappingInput[]) {
        this.mappingRules = this.processInputs(inputs);
    }

    processInputs(inputs: MappingInput[]) {
        return inputs.map(({ sourceStart, destinationStart, range }) => ({
            sourceStart,
            sourceEnd: sourceStart + range - 1,
            shift: destinationStart - sourceStart,
        }));
    }

    mapRanges(source: Range[]): Range[] {
        return source
            .map((s) => this.map(s))
            .reduce((allRanges, current) => [...allRanges, ...current], []);
    }

    getMappingRules(range: Range) {
        const { start, end } = range;
        return this.mappingRules.filter((rule) => {
            return (
                (rule.sourceStart <= start && rule.sourceEnd >= end) || // Whole range contained in mapping rule
                (rule.sourceStart >= start && rule.sourceStart <= end) ||
                (rule.sourceEnd >= start && rule.sourceEnd <= end)
            );
        });
    }

    doesRuleApply(num: number, rule: MappingRule) {
        return rule.sourceStart <= num && num <= rule.sourceEnd;
    }

    map(source: Range) {
        const rules = this.getMappingRules(source);
        let start = source.start;
        const result: Range[] = [];
        while (start < source.end) {
            const rule = rules.find((rule) => this.doesRuleApply(start, rule));
            if (rule) {
                //Split interval and apply shift
                const end =
                    source.end < rule.sourceEnd ? source.end : rule.sourceEnd;
                result.push({
                    start: start + rule.shift,
                    end: end + rule.shift,
                });
                start = end + 1;
                continue;
            }

            const nextRule = rules
                .filter((rule) => start < rule.sourceStart)
                .sort(
                    (ruleA, ruleB) => ruleA.sourceStart - ruleB.sourceStart
                )[0];
            if (!nextRule) {
                // No next rule, return the rest of the interval
                result.push({ start, end: source.end });
                break;
            }
            // Return up to the start of next rule
            const end = nextRule.sourceStart - 1;
            result.push({ start, end });
            start = end + 1;
        }
        return result;
    }
}

const parseSeedRow = (seedInput: string) => {
    const parsedInput = seedInput
        .substring("seeds: ".length)
        .split(" ")
        .map(toNumber);
    const seeds: Range[] = [];
    for (let i = 0; i < parsedInput.length - 1; i += 2) {
        const start = parsedInput[i];
        const range = parsedInput[i + 1];
        seeds.push({ start, end: start + range - 1 });
    }
    return seeds;
};

const parseMapping = (mappingInput: string) => {
    const rows = mappingInput.split("\n").slice(1);
    const inputs = rows
        .map((row) => row.split(" ").map(toNumber))
        .map(([destinationStart, sourceStart, range]) => ({
            destinationStart,
            sourceStart,
            range,
        }));

    return new Mapping(inputs);
};

const blocks = readBlocks("input.txt");

const seeds = parseSeedRow(blocks.shift()!);

const mappings = blocks.map(parseMapping);

const result = mappings.reduce<Range[]>(
    (source: Range[], currentMapping: Mapping) => {
        console.log("RULES", currentMapping.mappingRules);
        const n = currentMapping.mapRanges(source);
        console.log("RESULT", n);
        return n;
    },
    seeds
);

const lowest = result.sort((a, b) => a.start - b.start)[0].start;

console.log(lowest);
