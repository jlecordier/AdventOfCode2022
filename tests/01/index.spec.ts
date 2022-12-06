import { describe, expect, it } from 'vitest';
import {
    computeSums,
    getMaximum,
    getMaximumInElf,
    getSumOfTheFirstThree,
    getSumOfTheThreeMaximumElves,
    orderWithTheMaximumFirst,
    parseElves,
} from './index';

describe(`Day 01`, () => {
    describe(`given a text input`, () => {
        const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
        it(`should parse the elves`, () => {
            expect(parseElves(input)).toEqual([
                [1000, 2000, 3000],
                [4000],
                [5000, 6000],
                [7000, 8000, 9000],
                [10000],
            ]);
        });
    });

    describe(`given elves`, () => {
        const elves = [
            [1000, 2000, 3000],
            [4000],
            [5000, 6000],
            [7000, 8000, 9000],
            [10000],
        ];
        it(`should return the sum`, () => {
            expect(computeSums(elves)).toEqual([
                1000 + 2000 + 3000,
                4000,
                5000 + 6000,
                7000 + 8000 + 9000,
                10000,
            ]);
        });
    });

    describe(`given sums`, () => {
        const sums = [
            1000 + 2000 + 3000,
            4000,
            5000 + 6000,
            7000 + 8000 + 9000,
            10000,
        ];
        it(`should return the maximum`, () => {
            expect(getMaximum(sums)).toEqual(7000 + 8000 + 9000);
        });
    });

    describe(`--- Part One ---`, () => {
        describe(`given a text input`, () => {
            const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
            it(`should return the maximum`, () => {
                expect(getMaximumInElf(input)).toEqual(7000 + 8000 + 9000);
            });
        });
    });

    describe(`given sums`, () => {
        const sums = [
            1000 + 2000 + 3000,
            4000,
            5000 + 6000,
            7000 + 8000 + 9000,
            10000,
        ];
        it(`should order with the max first`, () => {
            expect(orderWithTheMaximumFirst(sums)).toEqual([
                7000 + 8000 + 9000,
                5000 + 6000,
                10000,
                1000 + 2000 + 3000,
                4000,
            ]);
        });
    });

    describe(`given sums`, () => {
        const sums = [
            7000 + 8000 + 9000,
            5000 + 6000,
            10000,
            1000 + 2000 + 3000,
            4000,
        ];
        it(`should compute the sum of the first three`, () => {
            expect(getSumOfTheFirstThree(sums)).toEqual(
                7000 + 8000 + 9000 + 5000 + 6000 + 10000
            );
        });
    });

    describe(`--- Part Two ---`, () => {
        describe(`given a text input`, () => {
            const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
            it(`should return the maximum`, () => {
                expect(getSumOfTheThreeMaximumElves(input)).toEqual(
                    7000 + 8000 + 9000 + 5000 + 6000 + 10000
                );
            });
        });
    });
});
