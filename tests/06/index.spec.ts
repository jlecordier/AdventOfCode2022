import { describe, expect, it } from 'vitest';
import {
    getIndexOfFirstNonRepeatedLetterForPartOne,
    getIndexOfFirstNonRepeatedLetterForPartTwo,
    isPacketNonRepeating,
} from './index';

describe(`Day 06`, () => {
    describe(`-- Part One --`, () => {
        it(`given a packet`, () => {
            it(`should be repeating`, () => {
                const packet = [`a`, `b`, `c`, `d`];
                expect(isPacketNonRepeating(packet)).toBeTruthy();
            });
            it(`should be non repeating`, () => {
                const packet = [`a`, `b`, `c`, `a`];
                expect(isPacketNonRepeating(packet)).toBeFalsy();
            });
        });
        it(`should get the index of the first letter that was not already present in the last three characters`, () => {
            const input1 = `abcd`;
            const input2 = `abcad`;
            const input3 = `abcabd`;
            const input4 = `abcabcd`;
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input1)).toEqual(
                4
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input2)).toEqual(
                5
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input3)).toEqual(
                6
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input4)).toEqual(
                7
            );
        });
        it(`should get the index of the first letter that was not already present in the last three characters`, () => {
            const input1 = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
            const input2 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
            const input3 = `nppdvjthqldpwncqszvftbrmjlhg`;
            const input4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
            const input5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input1)).toEqual(
                7
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input2)).toEqual(
                5
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input3)).toEqual(
                6
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input4)).toEqual(
                10
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartOne(input5)).toEqual(
                11
            );
        });
    });

    describe(`-- Part Two --`, () => {
        it(`should get the index of the first letter that was not already present in the last thirteen characters`, () => {
            const input1 = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
            const input2 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
            const input3 = `nppdvjthqldpwncqszvftbrmjlhg`;
            const input4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
            const input5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
            expect(getIndexOfFirstNonRepeatedLetterForPartTwo(input1)).toEqual(
                19
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartTwo(input2)).toEqual(
                23
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartTwo(input3)).toEqual(
                23
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartTwo(input4)).toEqual(
                29
            );
            expect(getIndexOfFirstNonRepeatedLetterForPartTwo(input5)).toEqual(
                26
            );
        });
    });
});
