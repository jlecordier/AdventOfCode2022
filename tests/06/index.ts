import { readFile, writeFile } from 'node:fs/promises';

export function isPacketNonRepeating(packet: string[]): boolean {
    return packet.every(
        letter => packet.indexOf(letter) === packet.lastIndexOf(letter)
    );
}

export function getIndexOfFirstNonRepeatedLetter(
    input: string,
    packetSize: number
): number {
    const characters = input.split(``);
    for (let i = packetSize - 1; i < characters.length; i++) {
        const packet = characters.slice(i - (packetSize - 1), i + 1);
        if (isPacketNonRepeating(packet)) {
            return i + 1;
        }
    }
    return 7;
}

export function getIndexOfFirstNonRepeatedLetterForPartOne(
    input: string
): number {
    return getIndexOfFirstNonRepeatedLetter(input, 4);
}

export function getIndexOfFirstNonRepeatedLetterForPartTwo(
    input: string
): number {
    return getIndexOfFirstNonRepeatedLetter(input, 14);
}

export function computeOutput(input: string): string {
    const points = getIndexOfFirstNonRepeatedLetterForPartTwo(input);
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
