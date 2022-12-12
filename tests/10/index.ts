import { readFile, writeFile } from 'node:fs/promises';

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export class Registry {
    cycles: number[] = [1];

    parseADDX(line: string): void {
        const [addx, value] = line.split(` `);
        this.cycles.push(0, +value);
    }

    parseNoOp(line: string): void {
        this.cycles.push(0);
    }

    getValueAt(index: number): number {
        const cycles = this.cycles.slice(0, index);
        return sum(cycles);
    }

    getStrengthAt(index: number): number {
        return this.getValueAt(index) * index;
    }

    getStrenghesSum(): number {
        const numberOfCycles = this.cycles.length;
        const values: number[] = [];
        for (let cycle = 20; cycle < numberOfCycles; cycle += 40) {
            values.push(this.getStrengthAt(cycle));
        }
        return sum(values);
    }

    getScreen(): string {
        const numberOfCycles = this.cycles.length;
        const PIXEL_PER_ROW = 40;
        const numberOfRows = Math.floor(numberOfCycles / PIXEL_PER_ROW);
        let screen = ``;
        let i = 0;
        for (let row = 0; row < numberOfRows; row++) {
            for (let pixel = 0; pixel < PIXEL_PER_ROW; pixel++) {
                const cycle = row * PIXEL_PER_ROW + pixel + 1;
                const sprite = this.getValueAt(cycle);
                if (Math.abs(sprite - pixel) <= 1) {
                    screen += `#`;
                } else {
                    screen += `.`;
                }
                i++;
            }
            screen += '\n';
        }
        return screen.slice(0, -1);
    }

    readLine(line: string): void {
        if (line.startsWith(`addx`)) {
            this.parseADDX(line);
        } else if (line.startsWith(`noop`)) {
            this.parseNoOp(line);
        }
    }

    readLines(lines: string[]): void {
        lines.forEach(line => this.readLine(line));
    }
}

export function getSumOfEvery40CyclesFromInput(input: string): number {
    const lines = getLines(input);
    const registry = new Registry();
    registry.readLines(lines);
    return registry.getStrenghesSum();
}

export function getScreenFromInput(input: string): string {
    const lines = getLines(input);
    const registry = new Registry();
    registry.readLines(lines);
    return registry.getScreen();
}

export function computeOutput(input: string): string {
    const screen = getScreenFromInput(input);
    return screen;
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
