import { readFile, writeFile } from 'node:fs/promises';

export function parseElves(input: string): number[][] {
    const elves: number[][] = [];
    const lines = input.split('\n');
    let elf: number[] = [];
    lines.forEach(line => {
        if (line) {
            elf.push(+line);
            return;
        }
        elves.push(elf);
        elf = [];
    });
    elves.push(elf);
    return elves;
}

export function computeSums(elves: number[][]): number[] {
    return elves.map(elf => elf.reduce((sum, present) => sum + present, 0));
}

export function getMaximum(sums: number[]): number {
    return Math.max(...sums);
}

export function getMaximumInElf(input: string): number {
    const elves = parseElves(input);
    const sums = computeSums(elves);
    const maximum = getMaximum(sums);
    return maximum;
}

export function orderWithTheMaximumFirst(sums: number[]): number[] {
    return [...sums].sort((a, b) => b - a);
}

export function getSumOfTheFirstThree(sums: number[]): number {
    return sums.slice(0, 3).reduce((sum, present) => sum + present, 0);
}

export function getSumOfTheThreeMaximumElves(input: string): number {
    const elves = parseElves(input);
    const sums = computeSums(elves);
    const orderedSums = orderWithTheMaximumFirst(sums);
    const sumOfTheThreeMaximumElves = getSumOfTheFirstThree(orderedSums);
    return sumOfTheThreeMaximumElves;
}

export function computeOutput(input: string): string {
    const maximum = getSumOfTheThreeMaximumElves(input);
    return maximum.toString();
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
