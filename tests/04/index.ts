import { readFile, writeFile } from 'node:fs/promises';

export interface ElfInterval {
    start: number;
    end: number;
}

export interface StringsPair {
    elf1: string;
    elf2: string;
}

export interface ElfIntervalPair {
    elf1: ElfInterval;
    elf2: ElfInterval;
}

export function parseStringsPairStringsFromInput(input: string): string[] {
    return input.split('\n');
}

export function parseStringsPairFromStringsPairString(
    stringsPairString: string
): StringsPair {
    const [elf1, elf2] = stringsPairString.split(`,`);
    return { elf1, elf2 };
}

export function parseElfIntervalFromElfIntervalString(
    elfIntervalString: string
): ElfInterval {
    const [start, end] = elfIntervalString.split(`-`).map(Number);
    return { start, end };
}

export function parseElfIntervalPairFromStringsPair(
    stringsPair: StringsPair
): ElfIntervalPair {
    const { elf1, elf2 } = stringsPair;
    return {
        elf1: parseElfIntervalFromElfIntervalString(elf1),
        elf2: parseElfIntervalFromElfIntervalString(elf2),
    };
}

export function parseElfIntervalPairsFromInput(
    input: string
): ElfIntervalPair[] {
    const stringsPairStrings = parseStringsPairStringsFromInput(input);
    return stringsPairStrings
        .map(parseStringsPairFromStringsPairString)
        .map(parseElfIntervalPairFromStringsPair);
}

export function intervalIncludesOther(
    interval: ElfInterval,
    other: ElfInterval
): boolean {
    return interval.start <= other.start && other.end <= interval.end;
}

export function intervalIncludes(
    interval: ElfInterval,
    value: number
): boolean {
    return interval.start <= value && value <= interval.end;
}

export function intervalOverlapsOther(
    interval: ElfInterval,
    other: ElfInterval
): boolean {
    return (
        intervalIncludes(interval, other.start) ||
        intervalIncludes(interval, other.end) ||
        intervalIncludes(other, interval.start) ||
        intervalIncludes(other, interval.end)
    );
}

export function isElfIntervalPairFullyOverlapping(
    elfIntervalPair: ElfIntervalPair
): boolean {
    const { elf1, elf2 } = elfIntervalPair;
    return (
        intervalIncludesOther(elf1, elf2) || intervalIncludesOther(elf2, elf1)
    );
}

export function isElfIntervalPairOverlapping(
    elfIntervalPair: ElfIntervalPair
): boolean {
    const { elf1, elf2 } = elfIntervalPair;
    return intervalOverlapsOther(elf1, elf2);
}

export function getFullyOverlappingElfIntervalPairs(
    elfIntervalPairs: ElfIntervalPair[]
): ElfIntervalPair[] {
    return elfIntervalPairs.filter(isElfIntervalPairFullyOverlapping);
}

export function getOverlappingElfIntervalPairs(
    elfIntervalPairs: ElfIntervalPair[]
): ElfIntervalPair[] {
    return elfIntervalPairs.filter(isElfIntervalPairOverlapping);
}

export function getNumberOfFullyOverlappingElfIntervalPairs(
    elfIntervalPairs: ElfIntervalPair[]
): number {
    return getFullyOverlappingElfIntervalPairs(elfIntervalPairs).length;
}

export function getNumberOfOverlappingElfIntervalPairs(
    elfIntervalPairs: ElfIntervalPair[]
): number {
    return getOverlappingElfIntervalPairs(elfIntervalPairs).length;
}

export function getNumberOfFullOverlapsFromInput(input: string): number {
    const elfIntervalPairs = parseElfIntervalPairsFromInput(input);
    return getNumberOfFullyOverlappingElfIntervalPairs(elfIntervalPairs);
}

export function getNumberOfOverlapsFromInput(input: string): number {
    const elfIntervalPairs = parseElfIntervalPairsFromInput(input);
    return getNumberOfOverlappingElfIntervalPairs(elfIntervalPairs);
}

export function computeOutput(input: string): string {
    const points = getNumberOfOverlapsFromInput(input);
    return points.toString();
}

export function readInput(): Promise<string> {
    return readFile(new URL('./input.txt', import.meta.url), `utf-8`);
}

export function writeOutput(output: string): Promise<void> {
    return writeFile(new URL('./output.txt', import.meta.url), output, `utf-8`);
}

async function index(): Promise<string> {
    const input = await readInput();
    const output = computeOutput(input);
    await writeOutput(output);
    return output;
}

index()
    .then(output => console.log(output))
    .catch(error => console.error(error));
