import { readFile, writeFile } from 'node:fs/promises';

export class Crate {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Stack {
    crates: Crate[] = [];

    addCrate(crate: Crate) {
        this.crates.push(crate);
    }

    addCrates(crates: Crate[]) {
        this.crates.push(...crates);
    }

    removeCrate(): Crate {
        return this.crates.pop()!;
    }

    removeCrates(quantity: number): Crate[] {
        return this.crates.splice(this.crates.length - quantity, quantity);
    }

    getTopCrate(): Crate {
        return this.crates[this.crates.length - 1];
    }
}

export class Crane {
    stacks: Stack[] = [];

    constructor(numberOfStacks: number) {
        for (let i = 0; i < numberOfStacks; i++) {
            this.addStack(new Stack());
        }
    }

    addStack(stack: Stack): void {
        this.stacks.push(stack);
    }

    getStack(index: number): Stack {
        return this.stacks[index - 1];
    }

    moveOneByOne(from: number, to: number, quantity: number): void {
        const fromStack = this.getStack(from);
        const toStack = this.getStack(to);
        for (let i = 0; i < quantity; i++) {
            toStack.addCrate(fromStack.removeCrate());
        }
    }

    moveMultipleAtOnce(from: number, to: number, quantity: number): void {
        const fromStack = this.getStack(from);
        const toStack = this.getStack(to);
        toStack.addCrates(fromStack.removeCrates(quantity));
    }

    parseCrates(line: string): void {
        let index = 0;
        const characters = line.split(``);
        for (let i = 0; i < characters.length; i += 4) {
            index++;
            const value = characters[i + 1];
            if (value !== ` `) {
                this.getStack(index).addCrate(new Crate(value));
            }
        }
    }

    getTopCrates(): Crate[] {
        return this.stacks.map(stack => stack.getTopCrate());
    }

    getTopValues(): string[] {
        return this.getTopCrates().map(crate => crate.value);
    }

    getMessage(): string {
        return this.getTopValues().join(``);
    }
}

export interface Move {
    from: number;
    to: number;
    quantity: number;
}

export function parseMove(moveString: string): Move {
    const [moveWord, quantity, fromWord, from, toWord, to] =
        moveString.split(` `);
    return {
        quantity: +quantity,
        from: +from,
        to: +to,
    };
}

export function parseNumberOfStacks(stacksString: string): number {
    const indexes = stacksString.split(` `).filter(x => !!x);
    return +indexes[indexes.length - 1];
}

export interface InputLines {
    crates: string[];
    indexes: string;
    moves: string[];
}

export function getGroupsOfLines(lines: string[]): InputLines {
    const separationLineIndex = lines.findIndex(line => line === ``);
    return {
        crates: lines.slice(0, separationLineIndex - 1),
        indexes: lines[separationLineIndex - 1],
        moves: lines.slice(separationLineIndex + 1),
    };
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export function getMessageForPart1(input: string): string {
    const lines = getLines(input);
    const { crates, indexes, moves } = getGroupsOfLines(lines);
    const numberOfStacks = parseNumberOfStacks(indexes);
    const crane = new Crane(numberOfStacks);
    crates.reverse().forEach(c => crane.parseCrates(c));
    moves.forEach(m => {
        const { from, to, quantity } = parseMove(m);
        crane.moveOneByOne(from, to, quantity);
    });
    return crane.getMessage();
}

export function getMessageForPart2(input: string): string {
    const lines = getLines(input);
    const { crates, indexes, moves } = getGroupsOfLines(lines);
    const numberOfStacks = parseNumberOfStacks(indexes);
    const crane = new Crane(numberOfStacks);
    crates.reverse().forEach(c => crane.parseCrates(c));
    moves.forEach(m => {
        const { from, to, quantity } = parseMove(m);
        crane.moveMultipleAtOnce(from, to, quantity);
    });
    return crane.getMessage();
}

export function computeOutput(input: string): string {
    const points = getMessageForPart2(input);
    return points;
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
