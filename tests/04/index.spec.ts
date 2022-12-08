import { describe, expect, it } from 'vitest';
import {
    ElfInterval,
    ElfIntervalPair,
    getFullyOverlappingElfIntervalPairs,
    getNumberOfFullOverlapsFromInput,
    getNumberOfFullyOverlappingElfIntervalPairs,
    getNumberOfOverlappingElfIntervalPairs,
    getNumberOfOverlapsFromInput,
    getOverlappingElfIntervalPairs,
    intervalIncludesOther,
    intervalOverlapsOther,
    isElfIntervalPairFullyOverlapping,
    isElfIntervalPairOverlapping,
    parseElfIntervalFromElfIntervalString,
    parseElfIntervalPairFromStringsPair,
    parseElfIntervalPairsFromInput,
    parseStringsPairFromStringsPairString,
    parseStringsPairStringsFromInput,
    StringsPair,
} from './index';

describe(`Day 04`, () => {
    describe(`given a text input`, () => {
        const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
        it(`should parse strings pair strings`, () => {
            expect(parseStringsPairStringsFromInput(input)).toEqual([
                `2-4,6-8`,
                `2-3,4-5`,
                `5-7,7-9`,
                `2-8,3-7`,
                `6-6,4-6`,
                `2-6,4-8`,
            ]);
        });
    });

    describe(`given strings pair string`, () => {
        const stringsPairString = `2-4,6-8`;
        it(`should parse strings pair`, () => {
            expect(
                parseStringsPairFromStringsPairString(stringsPairString)
            ).toEqual({
                elf1: `2-4`,
                elf2: `6-8`,
            });
        });
    });

    describe(`given elf interval string`, () => {
        const elfIntervalString = `2-4`;
        it(`should parse elf interval`, () => {
            expect(
                parseElfIntervalFromElfIntervalString(elfIntervalString)
            ).toEqual({
                start: 2,
                end: 4,
            });
        });
    });

    describe(`given strings pair`, () => {
        const stringsPair: StringsPair = {
            elf1: `2-4`,
            elf2: `6-8`,
        };
        it(`should parse elf interval pair`, () => {
            expect(parseElfIntervalPairFromStringsPair(stringsPair)).toEqual({
                elf1: {
                    start: 2,
                    end: 4,
                },
                elf2: {
                    start: 6,
                    end: 8,
                },
            });
        });
    });

    describe(`given input`, () => {
        const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
        it(`should parse elf interval pairs`, () => {
            expect(parseElfIntervalPairsFromInput(input)).toEqual([
                {
                    elf1: {
                        start: 2,
                        end: 4,
                    },
                    elf2: {
                        start: 6,
                        end: 8,
                    },
                },
                {
                    elf1: {
                        start: 2,
                        end: 3,
                    },
                    elf2: {
                        start: 4,
                        end: 5,
                    },
                },
                {
                    elf1: {
                        start: 5,
                        end: 7,
                    },
                    elf2: {
                        start: 7,
                        end: 9,
                    },
                },
                {
                    elf1: {
                        start: 2,
                        end: 8,
                    },
                    elf2: {
                        start: 3,
                        end: 7,
                    },
                },
                {
                    elf1: {
                        start: 6,
                        end: 6,
                    },
                    elf2: {
                        start: 4,
                        end: 6,
                    },
                },
                {
                    elf1: {
                        start: 2,
                        end: 6,
                    },
                    elf2: {
                        start: 4,
                        end: 8,
                    },
                },
            ]);
        });
    });

    describe(`given interval including other interval`, () => {
        const interval: ElfInterval = {
            start: 2,
            end: 8,
        };
        const other: ElfInterval = {
            start: 3,
            end: 7,
        };
        it(`should include other`, () => {
            expect(intervalIncludesOther(interval, other)).toBeTruthy();
        });
    });

    describe(`given interval not including other interval`, () => {
        const interval: ElfInterval = {
            start: 2,
            end: 4,
        };
        const other: ElfInterval = {
            start: 6,
            end: 8,
        };
        it(`should not include other`, () => {
            expect(intervalIncludesOther(interval, other)).toBeFalsy();
        });
    });

    describe(`given elf interval pair fully overlapping`, () => {
        const elfIntervalPair: ElfIntervalPair = {
            elf1: {
                start: 2,
                end: 8,
            },
            elf2: {
                start: 3,
                end: 7,
            },
        };
        it(`should be fully overlapping`, () => {
            expect(
                isElfIntervalPairFullyOverlapping(elfIntervalPair)
            ).toBeTruthy();
        });
    });

    describe(`given elf interval pair not fully overlapping`, () => {
        const elfIntervalPair: ElfIntervalPair = {
            elf1: {
                start: 2,
                end: 4,
            },
            elf2: {
                start: 6,
                end: 8,
            },
        };
        it(`should not be fully overlapping`, () => {
            expect(
                isElfIntervalPairFullyOverlapping(elfIntervalPair)
            ).toBeFalsy();
        });
    });

    describe(`given elf interval pairs`, () => {
        const elfIntervalPairs: ElfIntervalPair[] = [
            {
                elf1: {
                    start: 2,
                    end: 4,
                },
                elf2: {
                    start: 6,
                    end: 8,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 3,
                },
                elf2: {
                    start: 4,
                    end: 5,
                },
            },
            {
                elf1: {
                    start: 5,
                    end: 7,
                },
                elf2: {
                    start: 7,
                    end: 9,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 8,
                },
                elf2: {
                    start: 3,
                    end: 7,
                },
            },
            {
                elf1: {
                    start: 6,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 6,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 8,
                },
            },
        ];
        it(`should get full overlaps`, () => {
            expect(
                getFullyOverlappingElfIntervalPairs(elfIntervalPairs)
            ).toEqual([
                {
                    elf1: {
                        start: 2,
                        end: 8,
                    },
                    elf2: {
                        start: 3,
                        end: 7,
                    },
                },
                {
                    elf1: {
                        start: 6,
                        end: 6,
                    },
                    elf2: {
                        start: 4,
                        end: 6,
                    },
                },
            ]);
        });
    });

    describe(`given elf interval pairs`, () => {
        const elfIntervalPairs: ElfIntervalPair[] = [
            {
                elf1: {
                    start: 2,
                    end: 4,
                },
                elf2: {
                    start: 6,
                    end: 8,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 3,
                },
                elf2: {
                    start: 4,
                    end: 5,
                },
            },
            {
                elf1: {
                    start: 5,
                    end: 7,
                },
                elf2: {
                    start: 7,
                    end: 9,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 8,
                },
                elf2: {
                    start: 3,
                    end: 7,
                },
            },
            {
                elf1: {
                    start: 6,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 6,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 8,
                },
            },
        ];
        it(`should get number of full overlaps`, () => {
            expect(
                getNumberOfFullyOverlappingElfIntervalPairs(elfIntervalPairs)
            ).toEqual(2);
        });
    });

    describe(`-- Part One --`, () => {
        describe(`given a text input`, () => {
            const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
            it(`should get the number of full overlaps`, () => {
                expect(getNumberOfFullOverlapsFromInput(input)).toEqual(2);
            });
        });
    });

    describe(`given interval overlapping other interval`, () => {
        const interval: ElfInterval = {
            start: 5,
            end: 7,
        };
        const other: ElfInterval = {
            start: 7,
            end: 9,
        };
        it(`should overlap other`, () => {
            expect(intervalOverlapsOther(interval, other)).toBeTruthy();
            expect(intervalOverlapsOther(other, interval)).toBeTruthy();
        });
    });

    describe(`given interval including other interval`, () => {
        const interval: ElfInterval = {
            start: 2,
            end: 8,
        };
        const other: ElfInterval = {
            start: 3,
            end: 7,
        };
        it(`should overlap other`, () => {
            expect(intervalOverlapsOther(interval, other)).toBeTruthy();
            expect(intervalOverlapsOther(other, interval)).toBeTruthy();
        });
    });

    describe(`given interval not overlapping other interval`, () => {
        const interval: ElfInterval = {
            start: 2,
            end: 4,
        };
        const other: ElfInterval = {
            start: 6,
            end: 8,
        };
        it(`should not overlap other`, () => {
            expect(intervalOverlapsOther(interval, other)).toBeFalsy();
            expect(intervalOverlapsOther(other, interval)).toBeFalsy();
        });
    });

    describe(`given elf interval pair overlapping`, () => {
        const elfIntervalPair: ElfIntervalPair = {
            elf1: {
                start: 2,
                end: 8,
            },
            elf2: {
                start: 3,
                end: 7,
            },
        };
        it(`should be overlapping`, () => {
            expect(isElfIntervalPairOverlapping(elfIntervalPair)).toBeTruthy();
        });
    });

    describe(`given elf interval pair not overlapping`, () => {
        const elfIntervalPair: ElfIntervalPair = {
            elf1: {
                start: 2,
                end: 4,
            },
            elf2: {
                start: 6,
                end: 8,
            },
        };
        it(`should not be overlapping`, () => {
            expect(isElfIntervalPairOverlapping(elfIntervalPair)).toBeFalsy();
        });
    });

    describe(`given elf interval pairs`, () => {
        const elfIntervalPairs: ElfIntervalPair[] = [
            {
                elf1: {
                    start: 2,
                    end: 4,
                },
                elf2: {
                    start: 6,
                    end: 8,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 3,
                },
                elf2: {
                    start: 4,
                    end: 5,
                },
            },
            {
                elf1: {
                    start: 5,
                    end: 7,
                },
                elf2: {
                    start: 7,
                    end: 9,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 8,
                },
                elf2: {
                    start: 3,
                    end: 7,
                },
            },
            {
                elf1: {
                    start: 6,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 6,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 8,
                },
            },
        ];
        it(`should get overlaps`, () => {
            expect(getOverlappingElfIntervalPairs(elfIntervalPairs)).toEqual([
                {
                    elf1: {
                        start: 5,
                        end: 7,
                    },
                    elf2: {
                        start: 7,
                        end: 9,
                    },
                },
                {
                    elf1: {
                        start: 2,
                        end: 8,
                    },
                    elf2: {
                        start: 3,
                        end: 7,
                    },
                },
                {
                    elf1: {
                        start: 6,
                        end: 6,
                    },
                    elf2: {
                        start: 4,
                        end: 6,
                    },
                },
                {
                    elf1: {
                        start: 2,
                        end: 6,
                    },
                    elf2: {
                        start: 4,
                        end: 8,
                    },
                },
            ]);
        });
    });

    describe(`given elf interval pairs`, () => {
        const elfIntervalPairs: ElfIntervalPair[] = [
            {
                elf1: {
                    start: 2,
                    end: 4,
                },
                elf2: {
                    start: 6,
                    end: 8,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 3,
                },
                elf2: {
                    start: 4,
                    end: 5,
                },
            },
            {
                elf1: {
                    start: 5,
                    end: 7,
                },
                elf2: {
                    start: 7,
                    end: 9,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 8,
                },
                elf2: {
                    start: 3,
                    end: 7,
                },
            },
            {
                elf1: {
                    start: 6,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 6,
                },
            },
            {
                elf1: {
                    start: 2,
                    end: 6,
                },
                elf2: {
                    start: 4,
                    end: 8,
                },
            },
        ];
        it(`should get number of overlaps`, () => {
            expect(
                getNumberOfOverlappingElfIntervalPairs(elfIntervalPairs)
            ).toEqual(4);
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`given a text input`, () => {
            const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
            it(`should get the number of overlaps`, () => {
                expect(getNumberOfOverlapsFromInput(input)).toEqual(4);
            });
        });
    });
});
