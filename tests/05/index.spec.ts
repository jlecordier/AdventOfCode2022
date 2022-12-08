import { describe, expect, it } from 'vitest';
import {
    Crane,
    getGroupsOfLines,
    getLines,
    getMessageForPart1,
    getMessageForPart2,
    parseMove,
    parseNumberOfStacks,
} from './index';

describe(`Day 05`, () => {
    describe(`-- Part One --`, () => {
        it(`should get lines`, () => {
            const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
            expect(getLines(input)).toEqual([
                `    [D]`,
                `[N] [C]`,
                `[Z] [M] [P]`,
                ` 1   2   3`,
                ``,
                `move 1 from 2 to 1`,
                `move 3 from 1 to 3`,
                `move 2 from 2 to 1`,
                `move 1 from 1 to 2`,
            ]);
        });

        it(`should get groups of lines`, () => {
            const lines = [
                `    [D]`,
                `[N] [C]`,
                `[Z] [M] [P]`,
                ` 1   2   3`,
                ``,
                `move 1 from 2 to 1`,
                `move 3 from 1 to 3`,
                `move 2 from 2 to 1`,
                `move 1 from 1 to 2`,
            ];
            expect(getGroupsOfLines(lines)).toEqual({
                crates: [`    [D]`, `[N] [C]`, `[Z] [M] [P]`],
                indexes: ` 1   2   3`,
                moves: [
                    `move 1 from 2 to 1`,
                    `move 3 from 1 to 3`,
                    `move 2 from 2 to 1`,
                    `move 1 from 1 to 2`,
                ],
            });
        });

        it(`should parse the number of stacks`, () => {
            const indexes = ` 1   2   3`;
            expect(parseNumberOfStacks(indexes)).toEqual(3);
        });

        it(`should parse a move`, () => {
            const move = `move 1 from 2 to 1`;
            expect(parseMove(move)).toEqual({
                quantity: 1,
                from: 2,
                to: 1,
            });
        });

        describe(`given a crane`, () => {
            it(`should get top crate`, () => {
                const crane = new Crane(3);
                crane.parseCrates(`    [D]`);
                expect(crane.getStack(2).getTopCrate().value).toEqual(`D`);
            });

            it(`should get top crate`, () => {
                const crane = new Crane(3);
                crane.parseCrates(`[Z] [M] [P]`);
                crane.parseCrates(`[N] [C]`);
                crane.parseCrates(`    [D]`);
                expect(crane.getStack(1).getTopCrate().value).toEqual(`N`);
                expect(crane.getStack(2).getTopCrate().value).toEqual(`D`);
                expect(crane.getStack(3).getTopCrate().value).toEqual(`P`);
            });

            it(`should move crates one by one`, () => {
                const crane = new Crane(3);
                crane.parseCrates(`[Z] [M] [P]`);
                crane.parseCrates(`[N] [C]`);
                crane.parseCrates(`    [D]`);
                crane.moveOneByOne(2, 1, 1);
                crane.moveOneByOne(1, 3, 3);
                expect(crane.getStack(2).getTopCrate().value).toEqual(`C`);
                expect(crane.getStack(3).getTopCrate().value).toEqual(`Z`);
            });
        });

        describe(`given a text input`, () => {
            const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
            it(`should parse the crane, and return the message`, () => {
                expect(getMessageForPart1(input)).toEqual(`CMZ`);
            });
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`given a crane`, () => {
            it(`should move multiple crates at once`, () => {
                const crane = new Crane(3);
                crane.parseCrates(`[Z] [M] [P]`);
                crane.parseCrates(`[N] [C]`);
                crane.parseCrates(`    [D]`);
                crane.moveMultipleAtOnce(2, 1, 1);
                crane.moveMultipleAtOnce(1, 3, 3);
                expect(crane.getStack(2).getTopCrate().value).toEqual(`C`);
                expect(crane.getStack(3).getTopCrate().value).toEqual(`D`);
            });
        });

        describe(`given a text input`, () => {
            it(`should parse the crane, and return the message`, () => {
                const input = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
                it(`should parse the crane, and return the message`, () => {
                    expect(getMessageForPart2(input)).toEqual(`MCD`);
                });
            });
        });
    });
});
