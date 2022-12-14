import { readFile, writeFile } from 'node:fs/promises';

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export function getMonkeysLines(input: string): string[] {
    return input.split('\n\n');
}

export interface Item {
    worry: number;
}

export type OperationSymbol = `+` | `-` | `*` | `/`;
export type OldOrNumber = `old` | number;
export type WorryOperation = (worry: number) => number;
export type WorryTest = (worry: number) => boolean;

export function getOperationCorrespondingToSymbol(
    symbol: OperationSymbol
): (a: number, b: number) => number {
    switch (symbol) {
        case `+`:
            return (a, b) => a + b;
        case `-`:
            return (a, b) => a - b;
        case `*`:
            return (a, b) => a * b;
        case `/`:
            return (a, b) => a / b;
    }
}

export function parseOperator(op: string): OldOrNumber {
    return op === `old` ? `old` : +op;
}

export function parseWorryOperation(
    symbol: OperationSymbol,
    oldOrNumber: OldOrNumber
): WorryOperation {
    const operation = getOperationCorrespondingToSymbol(symbol);
    return worry =>
        operation(worry, oldOrNumber === `old` ? worry : oldOrNumber);
}

export function parseWorryOperationFromLine(line: string): WorryOperation {
    const [symbol, op2] = line.split(` `).slice(-2);
    return parseWorryOperation(symbol as OperationSymbol, parseOperator(op2));
}

export function parseWorryTestFromLine(line: string): WorryTest {
    const [value] = line.split(` `).slice(-1);
    return worry => worry % +value === 0;
}

export function parseDivisorFromLine(line: string): number {
    const [value] = line.split(` `).slice(-1);
    return +value;
}

export function parseItemsFromLine(line: string): Item[] {
    const valuesString = line.split(`Starting items: `)[1];
    const values = valuesString.split(`, `).map(value => +value);
    return values.map(value => ({ worry: value }));
}

export function parseMonkeyIndex(line: string): number {
    const [index] = line.split(` `).slice(-1);
    return +index;
}

export function isDivisibleBy(n: number, divisor: number): boolean {
    return n !== 0 && n % divisor === 0;
}

export function isDivisibleByEvery(n: number, divisors: number[]): boolean {
    return divisors.every(divisor => isDivisibleBy(n, divisor));
}

export function isDivisibleAtLeastTwice(n: number, divisor: number): boolean {
    return isDivisibleBy(n, divisor ** 2);
}

export function simplify(n: number, divisors: number[]): number {
    // console.log(`simplifying ${n} with divisors ${divisors}`);
    let simplified = n;
    divisors.forEach(d => {
        while (isDivisibleAtLeastTwice(simplified, d)) {
            simplified /= d;
        }
    });
    return simplified;
}

export class Monkey {
    monkeyGetter: (index: number) => Monkey;
    simplifier: (n: number) => number;
    shouldRelieveWorry: boolean;
    items: Item[];
    operation: WorryOperation;
    divisor: number;
    monkeyIndexToThrowAtIfTrue: number;
    monkeyIndexToThrowAtIfFalse: number;
    numberOfInspections = 0;

    constructor(
        monkeyGetter: (index: number) => Monkey,
        simplifier: (n: number) => number,
        shouldRelieveWorry: boolean,
        items: Item[],
        operation: WorryOperation,
        divisor: number,
        monkeyIndexToThrowAtIfTrue: number,
        monkeyIndexToThrowAtIfFalse: number
    ) {
        this.monkeyGetter = monkeyGetter;
        this.simplifier = simplifier;
        this.shouldRelieveWorry = shouldRelieveWorry;
        this.items = items;
        this.operation = operation;
        this.divisor = divisor;
        this.monkeyIndexToThrowAtIfTrue = monkeyIndexToThrowAtIfTrue;
        this.monkeyIndexToThrowAtIfFalse = monkeyIndexToThrowAtIfFalse;
    }

    catchItem(item: Item): void {
        this.items.push(item);
    }

    throwItem(): Item {
        return this.items.shift()!;
    }

    inspect(item: Item): void {
        this.numberOfInspections++;
        item.worry = this.operation(item.worry);
        if (this.shouldRelieveWorry) {
            item.worry = Math.floor(item.worry / 3);
        } else {
            item.worry = this.simplifier(item.worry);
        }
    }

    test(item: Item): boolean {
        return item.worry % this.divisor === 0;
    }

    getMonkeyIndexToThrowAt(item: Item): number {
        return this.test(item)
            ? this.monkeyIndexToThrowAtIfTrue
            : this.monkeyIndexToThrowAtIfFalse;
    }

    getMonkeyToThrowAt(item: Item): Monkey {
        return this.monkeyGetter(this.getMonkeyIndexToThrowAt(item));
    }

    executeItem(): void {
        const item = this.items[0];
        this.inspect(item);
        this.getMonkeyToThrowAt(item).catchItem(this.throwItem());
    }

    executeTurn(): void {
        const numberOfItems = this.items.length;
        for (let item = 0; item < numberOfItems; item++) {
            this.executeItem();
        }
    }
}

export class MonkeyInTheMiddle {
    monkeys: Monkey[] = [];
    shouldRelieveWorry: boolean;
    rounds: number;
    divisors: number[] = [];

    constructor(shouldRelieveWorry: boolean, rounds: number) {
        this.shouldRelieveWorry = shouldRelieveWorry;
        this.rounds = rounds;
    }

    getMonkey(index: number): Monkey {
        return this.monkeys[index];
    }

    addMonkey(monkey: Monkey): void {
        this.monkeys.push(monkey);
    }

    parseMonkeyLines(monkeyLines: string): void {
        const [
            indexLine,
            itemsLine,
            operationLine,
            testLine,
            trueLine,
            falseLine,
        ] = getLines(monkeyLines);
        const divisor = parseDivisorFromLine(testLine);
        this.addDivisor(divisor);
        this.addMonkey(
            new Monkey(
                (index: number) => this.getMonkey(index),
                (n: number) => this.simplify(n),
                this.shouldRelieveWorry,
                parseItemsFromLine(itemsLine),
                parseWorryOperationFromLine(operationLine),
                divisor,
                parseMonkeyIndex(trueLine),
                parseMonkeyIndex(falseLine)
            )
        );
    }

    addDivisor(divisor: number): void {
        this.divisors.push(divisor);
        this.divisors.sort((a, b) => b - a);
    }

    parseMonkeysLines(monkeysLines: string[]): void {
        monkeysLines.forEach(monkeyLine => this.parseMonkeyLines(monkeyLine));
    }

    parseInput(input: string): void {
        const monkeysLines = getMonkeysLines(input);
        this.parseMonkeysLines(monkeysLines);
    }

    getItems(): Item[] {
        return this.monkeys.flatMap(m => m.items);
    }

    simplify(n: number): number {
        return simplify(n, this.divisors);
    }

    simplifyItem(item: Item): void {
        item.worry = this.simplify(item.worry);
    }

    simplifyItems(): void {
        const items = this.getItems();
        items.map(item => this.simplifyItem(item));
    }

    executeRound(): void {
        this.monkeys.forEach(monkey => monkey.executeTurn());
    }

    executeRounds(rounds: number): void {
        for (let round = 0; round < rounds; round++) {
            this.executeRound();
        }
    }

    getMonkeysActivity(): number[] {
        return this.monkeys.map(monkey => monkey.numberOfInspections);
    }

    getMonkeysActivityOrdered(): number[] {
        return this.getMonkeysActivity().sort((a, b) => b - a);
    }

    getTwoMostActiveMonkeysActivity(): number[] {
        return this.getMonkeysActivityOrdered().slice(0, 2);
    }

    getMonkeyBusiness(): number {
        const [monkey1, monkey2] = this.getTwoMostActiveMonkeysActivity();
        return monkey1 * monkey2;
    }

    getMonkeyBusinessFromInput(input: string): number {
        this.parseInput(input);
        this.executeRounds(this.rounds);
        return this.getMonkeyBusiness();
    }
}

export function getMonkeyBusinessFromInputForPartOne(input: string): number {
    const monkeyInTheMiddle = new MonkeyInTheMiddle(true, 20);
    return monkeyInTheMiddle.getMonkeyBusinessFromInput(input);
}

export function getMonkeyBusinessFromInputForPartTwo(input: string): number {
    const monkeyInTheMiddle = new MonkeyInTheMiddle(false, 10000);
    return monkeyInTheMiddle.getMonkeyBusinessFromInput(input);
}

export function computeOutput(input: string): string {
    const business = getMonkeyBusinessFromInputForPartTwo(input);
    return business.toString();
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
