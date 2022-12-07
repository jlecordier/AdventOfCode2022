import { describe, expect, it } from 'vitest';
import {
    ElvesGroup,
    getCharacterAppearingInAllElves,
    getCharacterAppearingInBothCompartments,
    getSumOfElvesGroups,
    getSumOfElvesGroupsInput,
    getSumOfInput,
    getSumOfRucksacks,
    getValueOfElvesGroup,
    getValueOfLetter,
    getValueOfRucksack,
    getValuesOfElvesGroups,
    getValuesOfRucksacks,
    parseElvesGroups,
    parseElvesGroupsString,
    parseRucksack,
    parseRucksacks,
    parseRucksacksString,
    Rucksack,
    sum,
} from './index';

describe(`Day 03`, () => {
    describe(`given a text input`, () => {
        const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
        it(`should parse the rucksacks strings`, () => {
            expect(parseRucksacksString(input)).toEqual([
                `vJrwpWtwJgWrhcsFMMfFFhFp`,
                `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
                `PmmdzqPrVvPwwTWBwg`,
                `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
                `ttgJtRGJQctTZtZT`,
                `CrZsJsPPZsGzwwsLwLmpwMDw`,
            ]);
        });
    });

    describe(`given a rucksack string`, () => {
        const rucksackString = `vJrwpWtwJgWrhcsFMMfFFhFp`;
        it(`should parse the rucksack string`, () => {
            expect(parseRucksack(rucksackString)).toEqual({
                compartment1: `vJrwpWtwJgWr`,
                compartment2: `hcsFMMfFFhFp`,
            });
        });
    });

    describe(`given rucksacks strings`, () => {
        const rucksacksStrings = [
            `vJrwpWtwJgWrhcsFMMfFFhFp`,
            `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
            `PmmdzqPrVvPwwTWBwg`,
            `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
            `ttgJtRGJQctTZtZT`,
            `CrZsJsPPZsGzwwsLwLmpwMDw`,
        ];
        it(`should parse the rucksacks strings`, () => {
            expect(parseRucksacks(rucksacksStrings)).toEqual([
                {
                    compartment1: `vJrwpWtwJgWr`,
                    compartment2: `hcsFMMfFFhFp`,
                },
                {
                    compartment1: `jqHRNqRjqzjGDLGL`,
                    compartment2: `rsFMfFZSrLrFZsSL`,
                },
                {
                    compartment1: `PmmdzqPrV`,
                    compartment2: `vPwwTWBwg`,
                },
                {
                    compartment1: `wMqvLMZHhHMvwLH`,
                    compartment2: `jbvcjnnSBnvTQFn`,
                },
                {
                    compartment1: `ttgJtRGJ`,
                    compartment2: `QctTZtZT`,
                },
                {
                    compartment1: `CrZsJsPPZsGz`,
                    compartment2: `wwsLwLmpwMDw`,
                },
            ]);
        });
    });

    describe(`given a rucksack`, () => {
        const rucksack: Rucksack = {
            compartment1: `vJrwpWtwJgWr`,
            compartment2: `hcsFMMfFFhFp`,
        };
        it(`should get character appearing in both compartments`, () => {
            expect(getCharacterAppearingInBothCompartments(rucksack)).toEqual(
                `p`
            );
        });
    });

    describe(`given a letter`, () => {
        describe(`when the letter is in a-z`, () => {
            const letter = `p`;
            it(`should return its corresponding value`, () => {
                expect(getValueOfLetter(letter)).toEqual(16);
            });
        });

        describe(`when the letter is in A-Z`, () => {
            const letter = `L`;
            it(`should return its corresponding value`, () => {
                expect(getValueOfLetter(letter)).toEqual(38);
            });
        });
    });

    describe(`given a ruckstack`, () => {
        const rucksack: Rucksack = {
            compartment1: `vJrwpWtwJgWr`,
            compartment2: `hcsFMMfFFhFp`,
        };
        it(`should return its corresponding value`, () => {
            expect(getValueOfRucksack(rucksack)).toEqual(16);
        });
    });

    describe(`given ruckstacks`, () => {
        const rucksacks: Rucksack[] = [
            {
                compartment1: `vJrwpWtwJgWr`,
                compartment2: `hcsFMMfFFhFp`,
            },
            {
                compartment1: `jqHRNqRjqzjGDLGL`,
                compartment2: `rsFMfFZSrLrFZsSL`,
            },
            {
                compartment1: `PmmdzqPrV`,
                compartment2: `vPwwTWBwg`,
            },
            {
                compartment1: `wMqvLMZHhHMvwLH`,
                compartment2: `jbvcjnnSBnvTQFn`,
            },
            {
                compartment1: `ttgJtRGJ`,
                compartment2: `QctTZtZT`,
            },
            {
                compartment1: `CrZsJsPPZsGz`,
                compartment2: `wwsLwLmpwMDw`,
            },
        ];
        it(`should return its corresponding value`, () => {
            expect(getValuesOfRucksacks(rucksacks)).toEqual([
                16, 38, 42, 22, 20, 19,
            ]);
        });
    });

    describe(`given numbers`, () => {
        const numbers = [1, 2, 3];
        it(`should sum the numbers`, () => {
            expect(sum(numbers)).toEqual(6);
        });
    });

    describe(`given ruckstacks`, () => {
        const rucksacks: Rucksack[] = [
            {
                compartment1: `vJrwpWtwJgWr`,
                compartment2: `hcsFMMfFFhFp`,
            },
            {
                compartment1: `jqHRNqRjqzjGDLGL`,
                compartment2: `rsFMfFZSrLrFZsSL`,
            },
            {
                compartment1: `PmmdzqPrV`,
                compartment2: `vPwwTWBwg`,
            },
            {
                compartment1: `wMqvLMZHhHMvwLH`,
                compartment2: `jbvcjnnSBnvTQFn`,
            },
            {
                compartment1: `ttgJtRGJ`,
                compartment2: `QctTZtZT`,
            },
            {
                compartment1: `CrZsJsPPZsGz`,
                compartment2: `wwsLwLmpwMDw`,
            },
        ];
        it(`should sum the rucksacks`, () => {
            expect(getSumOfRucksacks(rucksacks)).toEqual(157);
        });
    });

    describe(`--- Part One ---`, () => {
        describe(`given a text input`, () => {
            const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
            it(`should get the sum of rucksacks`, () => {
                expect(getSumOfInput(input)).toEqual(157);
            });
        });
    });

    describe(`given rucksacks strings`, () => {
        const rucksacksStrings = [
            `vJrwpWtwJgWrhcsFMMfFFhFp`,
            `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
            `PmmdzqPrVvPwwTWBwg`,
            `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
            `ttgJtRGJQctTZtZT`,
            `CrZsJsPPZsGzwwsLwLmpwMDw`,
        ];
        it(`should parse elves groups`, () => {
            expect(parseElvesGroups(rucksacksStrings)).toEqual([
                {
                    elf1: `vJrwpWtwJgWrhcsFMMfFFhFp`,
                    elf2: `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
                    elf3: `PmmdzqPrVvPwwTWBwg`,
                },
                {
                    elf1: `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
                    elf2: `ttgJtRGJQctTZtZT`,
                    elf3: `CrZsJsPPZsGzwwsLwLmpwMDw`,
                },
            ]);
        });
    });

    describe(`given a text input`, () => {
        const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
        it(`should parse elves groups`, () => {
            expect(parseElvesGroupsString(input)).toEqual([
                {
                    elf1: `vJrwpWtwJgWrhcsFMMfFFhFp`,
                    elf2: `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
                    elf3: `PmmdzqPrVvPwwTWBwg`,
                },
                {
                    elf1: `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
                    elf2: `ttgJtRGJQctTZtZT`,
                    elf3: `CrZsJsPPZsGzwwsLwLmpwMDw`,
                },
            ]);
        });
    });

    describe(`given an elves group`, () => {
        const group: ElvesGroup = {
            elf1: `vJrwpWtwJgWrhcsFMMfFFhFp`,
            elf2: `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
            elf3: `PmmdzqPrVvPwwTWBwg`,
        };
        it(`should get character appearing in all elves`, () => {
            expect(getCharacterAppearingInAllElves(group)).toEqual(`r`);
        });
    });

    describe(`given an elves group`, () => {
        const group: ElvesGroup = {
            elf1: `vJrwpWtwJgWrhcsFMMfFFhFp`,
            elf2: `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
            elf3: `PmmdzqPrVvPwwTWBwg`,
        };
        it(`should get value of character appearing in all elves`, () => {
            expect(getValueOfElvesGroup(group)).toEqual(18);
        });
    });

    describe(`given elves groups`, () => {
        const groups: ElvesGroup[] = [
            {
                elf1: `vJrwpWtwJgWrhcsFMMfFFhFp`,
                elf2: `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
                elf3: `PmmdzqPrVvPwwTWBwg`,
            },
            {
                elf1: `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
                elf2: `ttgJtRGJQctTZtZT`,
                elf3: `CrZsJsPPZsGzwwsLwLmpwMDw`,
            },
        ];
        it(`should get value for each group`, () => {
            expect(getValuesOfElvesGroups(groups)).toEqual([18, 52]);
        });
    });

    describe(`given elves groups`, () => {
        const groups: ElvesGroup[] = [
            {
                elf1: `vJrwpWtwJgWrhcsFMMfFFhFp`,
                elf2: `jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`,
                elf3: `PmmdzqPrVvPwwTWBwg`,
            },
            {
                elf1: `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn`,
                elf2: `ttgJtRGJQctTZtZT`,
                elf3: `CrZsJsPPZsGzwwsLwLmpwMDw`,
            },
        ];
        it(`should sum the values`, () => {
            expect(getSumOfElvesGroups(groups)).toEqual(70);
        });
    });

    describe(`given a text input`, () => {
        const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
        it(`should sum the values`, () => {
            expect(getSumOfElvesGroupsInput(input)).toEqual(70);
        });
    });

    describe(`--- Part Two ---`, () => {
        describe(`given a text input`, () => {
            const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
            it(`should get the sum of rucksacks`, () => {
                expect(getSumOfInput(input)).toEqual(157);
            });
        });
    });
});
