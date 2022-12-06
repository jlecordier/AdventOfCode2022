import { readFile, writeFile } from 'node:fs/promises';

export enum ElfPick {
    ROCK = `A`,
    PAPER = `B`,
    SCISSORS = `C`,
}

export enum MePick {
    ROCK = `X`,
    PAPER = `Y`,
    SCISSORS = `Z`,
}

export type RoundResult = `win` | `draw` | `loss`;

export enum RoundResultNeeded {
    LOSS = `X`,
    DRAW = `Y`,
    WIN = `Z`,
}

const pointsPerPick: Record<MePick, number> = {
    [MePick.ROCK]: 1,
    [MePick.PAPER]: 2,
    [MePick.SCISSORS]: 3,
};

const pointsPerResult: Record<RoundResult, number> = {
    win: 6,
    draw: 3,
    loss: 0,
};

export interface Round {
    elf: ElfPick;
    me: MePick;
}

export interface NeededRound {
    elf: ElfPick;
    me: RoundResultNeeded;
}

export function parseRound(input: string): Round {
    return {
        elf: input[0] as ElfPick,
        me: input[2] as MePick,
    };
}

export function parseNeededRound(input: string): NeededRound {
    return {
        elf: input[0] as ElfPick,
        me: input[2] as RoundResultNeeded,
    };
}

export function parseRounds(input: string): Round[] {
    return input.split('\n').map(parseRound);
}

export function parseNeededRounds(input: string): NeededRound[] {
    return input.split('\n').map(parseNeededRound);
}

/**
 * A -   Rock   - X
 * B -  Paper   - Y
 * C - Scissors - Z
 * Rock  beats  Scissors  beats  Paper  beats  Rock
 * A/X   beats    C/Z     beats   B/Y   beats  A/X
 */
export function getRoundResult(round: Round): RoundResult {
    const { me, elf } = round;
    if (
        (me === MePick.ROCK && elf === ElfPick.ROCK) ||
        (me === MePick.PAPER && elf === ElfPick.PAPER) ||
        (me === MePick.SCISSORS && elf === ElfPick.SCISSORS)
    ) {
        return `draw`;
    }
    if (
        (me === MePick.ROCK && elf === ElfPick.SCISSORS) ||
        (me === MePick.PAPER && elf === ElfPick.ROCK) ||
        (me === MePick.SCISSORS && elf === ElfPick.PAPER)
    ) {
        return `win`;
    }
    return `loss`;
}

export function getWinningPickAgainst(elf: ElfPick): MePick {
    switch (elf) {
        case ElfPick.ROCK:
            return MePick.PAPER;
        case ElfPick.PAPER:
            return MePick.SCISSORS;
        case ElfPick.SCISSORS:
            return MePick.ROCK;
    }
}

export function getLosingPickAgainst(elf: ElfPick): MePick {
    switch (elf) {
        case ElfPick.ROCK:
            return MePick.SCISSORS;
        case ElfPick.PAPER:
            return MePick.ROCK;
        case ElfPick.SCISSORS:
            return MePick.PAPER;
    }
}

export function getDrawPickAgainst(elf: ElfPick): MePick {
    switch (elf) {
        case ElfPick.ROCK:
            return MePick.ROCK;
        case ElfPick.PAPER:
            return MePick.PAPER;
        case ElfPick.SCISSORS:
            return MePick.SCISSORS;
    }
}

export function getNeededPick(
    elf: ElfPick,
    neededResult: RoundResultNeeded
): MePick {
    switch (neededResult) {
        case RoundResultNeeded.WIN:
            return getWinningPickAgainst(elf);
        case RoundResultNeeded.DRAW:
            return getDrawPickAgainst(elf);
        case RoundResultNeeded.LOSS:
            return getLosingPickAgainst(elf);
    }
}

export function getRoundPoints(round: Round): number {
    return pointsPerPick[round.me] + pointsPerResult[getRoundResult(round)];
}

export function getNeededRoundPoints(neededRound: NeededRound): number {
    const me = getNeededPick(neededRound.elf, neededRound.me);
    const round: Round = { elf: neededRound.elf, me };
    return pointsPerPick[me] + pointsPerResult[getRoundResult(round)];
}

export function getRoundsPoints(rounds: Round[]): number {
    return rounds.reduce((sum, round) => sum + getRoundPoints(round), 0);
}

export function getNeededRoundsPoints(rounds: NeededRound[]): number {
    return rounds.reduce((sum, round) => sum + getNeededRoundPoints(round), 0);
}

export function getPoints(input: string): number {
    const rounds = parseRounds(input);
    return getRoundsPoints(rounds);
}

export function getPointsForPart2(input: string): number {
    const rounds = parseNeededRounds(input);
    return getNeededRoundsPoints(rounds);
}

export function computeOutput(input: string): string {
    const points = getPointsForPart2(input);
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
    .then((output) => console.log(output))
    .catch((error) => console.error(error));
