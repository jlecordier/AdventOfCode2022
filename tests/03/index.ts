import { readFile, writeFile } from 'node:fs/promises';

export interface Rucksack {
    compartment1: string;
    compartment2: string;
}

export function parseRucksacksString(input: string): string[] {
    return input.split('\n');
}

export function parseRucksack(rucksackString: string): Rucksack {
    const middle = rucksackString.length / 2;
    const rucksack: Rucksack = {
        compartment1: rucksackString.slice(0, middle),
        compartment2: rucksackString.slice(middle),
    };
    return rucksack;
}

export function parseRucksacks(rucksacksStrings: string[]): Rucksack[] {
    return rucksacksStrings.map(parseRucksack);
}

export function parseRucksacksFromInput(rucksackString: string): Rucksack[] {
    return parseRucksacks(parseRucksacksString(rucksackString));
}

export function getCharacterAppearingInBothCompartments(
    rucksack: Rucksack
): string {
    const charactersInCompartment1 = rucksack.compartment1.split(``);
    const characterInBothCompartments = charactersInCompartment1.find(
        character => rucksack.compartment2.includes(character)
    )!;
    return characterInBothCompartments;
}

const ALPHABET = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
export function getValueOfLetter(letter: string): number {
    return ALPHABET.indexOf(letter) + 1;
}

export function getValueOfRucksack(rucksack: Rucksack): number {
    return getValueOfLetter(getCharacterAppearingInBothCompartments(rucksack));
}

export function getValuesOfRucksacks(rucksacks: Rucksack[]): number[] {
    return rucksacks.map(r =>
        getValueOfLetter(getCharacterAppearingInBothCompartments(r))
    );
}

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, value) => sum + value, 0);
}

export function getSumOfRucksacks(rucksacks: Rucksack[]): number {
    return sum(getValuesOfRucksacks(rucksacks));
}

export function getSumOfInput(input: string): number {
    return getSumOfRucksacks(parseRucksacks(parseRucksacksString(input)));
}
export interface ElvesGroup {
    elf1: string;
    elf2: string;
    elf3: string;
}

export function parseElvesGroups(rucksacks: string[]): ElvesGroup[] {
    const groups: ElvesGroup[] = [];
    for (let i = 0; i < rucksacks.length; i += 3) {
        const group: ElvesGroup = {
            elf1: rucksacks[i],
            elf2: rucksacks[i + 1],
            elf3: rucksacks[i + 2],
        };
        groups.push(group);
    }
    return groups;
}

export function parseElvesGroupsString(input: string): ElvesGroup[] {
    const rucksacks = parseRucksacksString(input);
    return parseElvesGroups(rucksacks);
}

export function getCharacterAppearingInAllElves(group: ElvesGroup): string {
    const charactersInElf1 = group.elf1.split(``);
    const charactersAppearingInElf1AndElf2 = charactersInElf1.filter(
        character => group.elf2.includes(character)
    );
    const characterInAllElves = charactersAppearingInElf1AndElf2.find(
        character => group.elf3.includes(character)
    )!;
    return characterInAllElves;
}

export function getValueOfElvesGroup(group: ElvesGroup): number {
    return getValueOfLetter(getCharacterAppearingInAllElves(group));
}

export function getValuesOfElvesGroups(groups: ElvesGroup[]): number[] {
    return groups.map(getValueOfElvesGroup);
}

export function getSumOfElvesGroups(groups: ElvesGroup[]): number {
    return sum(getValuesOfElvesGroups(groups));
}

export function getSumOfElvesGroupsInput(input: string): number {
    const groups = parseElvesGroupsString(input);
    return getSumOfElvesGroups(groups);
}

export function computeOutput(input: string): string {
    const points = getSumOfElvesGroupsInput(input);
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
