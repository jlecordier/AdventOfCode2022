import { describe, expect, it } from 'vitest';
import {
    parseRounds,
    Round,
    getRoundResult,
    getRoundPoints,
    getRoundsPoints,
    getPoints,
    getPointsForPart2,
    MePick,
    ElfPick,
} from './index';

describe(`Day 02`, () => {
    describe(`given a text input`, () => {
        const input = `A Y
B X
C Z`;
        it(`should parse the rounds`, () => {
            expect(parseRounds(input)).toEqual([
                { elf: `A`, me: `Y` },
                { elf: `B`, me: `X` },
                { elf: `C`, me: `Z` },
            ]);
        });
    });

    describe(`given a round`, () => {
        describe(`when I win with Paper`, () => {
            const round: Round = {
                elf: ElfPick.ROCK,
                me: MePick.PAPER,
            };
            it(`should return win`, () => {
                expect(getRoundResult(round)).toEqual(`win`);
            });
            it(`should return 6+2 points`, () => {
                expect(getRoundPoints(round)).toEqual(6 + 2);
            });
        });
        describe(`when I lose with Rock`, () => {
            const round: Round = {
                elf: ElfPick.PAPER,
                me: MePick.ROCK,
            };
            it(`should return loss`, () => {
                expect(getRoundResult(round)).toEqual(`loss`);
            });
            it(`should return 0+1 point`, () => {
                expect(getRoundPoints(round)).toEqual(0 + 1);
            });
        });
        describe(`when I draw with Scissors`, () => {
            const round: Round = {
                elf: ElfPick.SCISSORS,
                me: MePick.SCISSORS,
            };
            it(`should return draw`, () => {
                expect(getRoundResult(round)).toEqual(`draw`);
            });
            it(`should return 3+3 points`, () => {
                expect(getRoundPoints(round)).toEqual(3 + 3);
            });
        });
    });

    describe(`given rounds`, () => {
        const rounds: Round[] = [
            {
                elf: ElfPick.ROCK,
                me: MePick.PAPER,
            },
            {
                elf: ElfPick.PAPER,
                me: MePick.ROCK,
            },
            {
                elf: ElfPick.SCISSORS,
                me: MePick.SCISSORS,
            },
        ];
        it(`should return the sum of the points`, () => {
            expect(getRoundsPoints(rounds)).toEqual(6 + 2 + 0 + 1 + 3 + 3);
        });
    });

    describe(`--- Part One ---`, () => {
        describe(`given a text input`, () => {
            const input = `A Y
B X
C Z`;
            it(`should compute the points`, () => {
                expect(getPoints(input)).toEqual(6 + 2 + 0 + 1 + 3 + 3);
            });
        });
    });

    describe(`--- Part Two ---`, () => {
        describe(`given a text input`, () => {
            const input = `A Y
B X
C Z`;
            it(`should compute the points`, () => {
                expect(getPointsForPart2(input)).toEqual(1 + 3 + 1 + 0 + 1 + 6);
            });
        });
    });
});
