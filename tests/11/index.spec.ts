import { describe, expect, it } from 'vitest';
import {
    getMonkeyBusinessFromInputForPartOne,
    getMonkeyBusinessFromInputForPartTwo,
    getMonkeysLines,
    getOperationCorrespondingToSymbol,
    isDivisibleAtLeastTwice,
    isDivisibleBy,
    isDivisibleByEvery,
    MonkeyInTheMiddle,
    parseDivisorFromLine,
    parseItemsFromLine,
    parseMonkeyIndex,
    parseOperator,
    parseWorryOperation,
    parseWorryOperationFromLine,
    parseWorryTestFromLine,
    simplify,
} from './index';

const EXAMPLE_INPUT = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

describe(`Day 11`, () => {
    describe(`-- Part One --`, () => {
        describe(`given a text input`, () => {
            const input = EXAMPLE_INPUT;
            it(`should get monkeys lines`, () => {
                const expected = [
                    `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`,
                    `Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0`,
                    `Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3`,
                    `Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
                ];
                expect(getMonkeysLines(input)).toEqual(expected);
            });
        });
        describe(`getOperationCorrespondingToSymbol`, () => {
            const a = 10;
            const b = 2;
            describe(`given symbol +`, () => {
                const symbol = `+`;
                it(`should parse the correct function`, () => {
                    const operation = getOperationCorrespondingToSymbol(symbol);
                    expect(operation(a, b)).toEqual(a + b);
                });
            });
            describe(`given symbol -`, () => {
                const symbol = `-`;
                it(`should parse the correct function`, () => {
                    const operation = getOperationCorrespondingToSymbol(symbol);
                    expect(operation(a, b)).toEqual(a - b);
                });
            });
            describe(`given symbol *`, () => {
                const symbol = `*`;
                it(`should parse the correct function`, () => {
                    const operation = getOperationCorrespondingToSymbol(symbol);
                    expect(operation(a, b)).toEqual(a * b);
                });
            });
            describe(`given symbol /`, () => {
                const symbol = `/`;
                it(`should parse the correct function`, () => {
                    const operation = getOperationCorrespondingToSymbol(symbol);
                    expect(operation(a, b)).toEqual(a / b);
                });
            });
        });

        describe(`parseOperator`, () => {
            describe(`given old`, () => {
                it(`should parse the correct function`, () => {
                    expect(parseOperator(`old`)).toEqual(`old`);
                });
            });
            describe(`given number`, () => {
                it(`should parse the correct function`, () => {
                    expect(parseOperator(`7`)).toEqual(7);
                });
            });
        });

        describe(`parseWorryOperation`, () => {
            const worry = 10;
            describe(`given old`, () => {
                const op = `old`;
                describe(`when using +`, () => {
                    const symbol = `+`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry + worry);
                    });
                });
                describe(`when using -`, () => {
                    const symbol = `-`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry - worry);
                    });
                });
                describe(`when using *`, () => {
                    const symbol = `*`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry * worry);
                    });
                });
                describe(`when using /`, () => {
                    const symbol = `/`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry / worry);
                    });
                });
            });
            describe(`given number`, () => {
                const op = 2;
                describe(`when using +`, () => {
                    const symbol = `+`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry + op);
                    });
                });
                describe(`when using -`, () => {
                    const symbol = `-`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry - op);
                    });
                });
                describe(`when using *`, () => {
                    const symbol = `*`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry * op);
                    });
                });
                describe(`when using /`, () => {
                    const symbol = `/`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperation(symbol, op);
                        expect(operation(worry)).toEqual(worry / op);
                    });
                });
            });
        });

        describe(`parseWorryOperationFromLine`, () => {
            const worry = 10;
            describe(`given old`, () => {
                const op = `old`;
                describe(`when using +`, () => {
                    const symbol = `+`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry + worry);
                    });
                });
                describe(`when using -`, () => {
                    const symbol = `-`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry - worry);
                    });
                });
                describe(`when using *`, () => {
                    const symbol = `*`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry * worry);
                    });
                });
                describe(`when using /`, () => {
                    const symbol = `/`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry / worry);
                    });
                });
            });
            describe(`given number`, () => {
                const op = 7;
                describe(`when using +`, () => {
                    const symbol = `+`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry + op);
                    });
                });
                describe(`when using -`, () => {
                    const symbol = `-`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry - op);
                    });
                });
                describe(`when using *`, () => {
                    const symbol = `*`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry * op);
                    });
                });
                describe(`when using /`, () => {
                    const symbol = `/`;
                    const line = `  Operation: new = old ${symbol} ${op}`;
                    it(`should parse the correct function`, () => {
                        const operation = parseWorryOperationFromLine(line);
                        expect(operation(worry)).toEqual(worry / op);
                    });
                });
            });
        });

        describe(`parseWorryTestFromLine`, () => {
            const line = `  Test: divisible by 23`;
            describe(`given non divisible`, () => {
                const worry = 23 * 2 - 1;
                it(`should parse the correct function`, () => {
                    const test = parseWorryTestFromLine(line);
                    expect(test(worry)).toBeFalsy();
                });
            });
            describe(`given divisible`, () => {
                const worry = 23 * 2;
                it(`should parse the correct function`, () => {
                    const test = parseWorryTestFromLine(line);
                    expect(test(worry)).toBeTruthy();
                });
            });
        });

        describe(`parseDivisorFromLine`, () => {
            const line = `  Test: divisible by 23`;
            it(`should parse the correct function`, () => {
                expect(parseDivisorFromLine(line)).toEqual(23);
            });
        });

        describe(`parseItemsFromLine`, () => {
            describe(`given one starting item`, () => {
                const line = `  Starting items: 79`;
                it(`should parse items`, () => {
                    expect(parseItemsFromLine(line)).toEqual([{ worry: 79 }]);
                });
            });
            describe(`given starting items`, () => {
                const line = `  Starting items: 79, 98`;
                it(`should parse items`, () => {
                    expect(parseItemsFromLine(line)).toEqual([
                        { worry: 79 },
                        { worry: 98 },
                    ]);
                });
            });
        });

        describe(`parseMonkeyIndex`, () => {
            const line = `    If true: throw to monkey 2`;
            it(`should monkey index`, () => {
                expect(parseMonkeyIndex(line)).toEqual(2);
            });
        });

        describe(`given a monkeyInTheMiddle`, () => {
            const SHOULD_RELIEVE_WORRY = true;

            describe(`when parsing one monkey lines`, () => {
                const rounds = 0;
                const monkeyLines = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`;
                it(`should parse a monkey`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseMonkeyLines(monkeyLines);
                    const monkey = monkeyInTheMiddle.getMonkey(0);
                    expect(monkey.items).toEqual([
                        { worry: 79 },
                        { worry: 98 },
                    ]);
                    expect(monkey.operation(10)).toEqual(10 * 19);
                    expect(monkey.divisor).toEqual(23);
                    expect(monkey.monkeyIndexToThrowAtIfTrue).toEqual(2);
                    expect(monkey.monkeyIndexToThrowAtIfFalse).toEqual(3);
                    expect(monkey.numberOfInspections).toEqual(0);
                });
            });

            describe(`when parsing input`, () => {
                const rounds = 0;
                it(`should have correct initial state`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    expect(monkeyInTheMiddle.divisors).toEqual([
                        23, 19, 17, 13,
                    ]);
                    expect(monkeyInTheMiddle.getMonkeysActivity()).toEqual([
                        0, 0, 0, 0,
                    ]);

                    // Monkey 0
                    const monkey0 = monkeyInTheMiddle.getMonkey(0);
                    expect(monkey0.items).toEqual(
                        [79, 98].map(n => ({ worry: n }))
                    );
                    expect(monkey0.operation(10)).toEqual(10 * 19);
                    expect(monkey0.divisor).toEqual(23);
                    expect(monkey0.monkeyIndexToThrowAtIfTrue).toEqual(2);
                    expect(monkey0.monkeyIndexToThrowAtIfFalse).toEqual(3);
                    expect(monkey0.numberOfInspections).toEqual(0);

                    // Monkey 1
                    const monkey1 = monkeyInTheMiddle.getMonkey(1);
                    expect(monkey1.items).toEqual(
                        [54, 65, 75, 74].map(n => ({ worry: n }))
                    );
                    expect(monkey1.operation(10)).toEqual(10 + 6);
                    expect(monkey1.divisor).toEqual(19);
                    expect(monkey1.monkeyIndexToThrowAtIfTrue).toEqual(2);
                    expect(monkey1.monkeyIndexToThrowAtIfFalse).toEqual(0);
                    expect(monkey1.numberOfInspections).toEqual(0);

                    // Monkey 2
                    const monkey2 = monkeyInTheMiddle.getMonkey(2);
                    expect(monkey2.items).toEqual(
                        [79, 60, 97].map(n => ({ worry: n }))
                    );
                    expect(monkey2.operation(10)).toEqual(10 * 10);
                    expect(monkey2.divisor).toEqual(13);
                    expect(monkey2.monkeyIndexToThrowAtIfTrue).toEqual(1);
                    expect(monkey2.monkeyIndexToThrowAtIfFalse).toEqual(3);
                    expect(monkey2.numberOfInspections).toEqual(0);

                    // Monkey 3
                    const monkey3 = monkeyInTheMiddle.getMonkey(3);
                    expect(monkey3.items).toEqual(
                        [74].map(n => ({ worry: n }))
                    );
                    expect(monkey3.operation(10)).toEqual(10 + 3);
                    expect(monkey3.divisor).toEqual(17);
                    expect(monkey3.monkeyIndexToThrowAtIfTrue).toEqual(0);
                    expect(monkey3.monkeyIndexToThrowAtIfFalse).toEqual(1);
                    expect(monkey3.numberOfInspections).toEqual(0);
                });
            });

            describe(`when executing 1 round`, () => {
                const rounds = 1;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [20, 23, 27, 26].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [2080, 25, 167, 207, 401, 1046].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 2 round`, () => {
                const rounds = 2;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [695, 10, 71, 135, 350].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [43, 49, 58, 55, 362].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 3 round`, () => {
                const rounds = 3;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [16, 18, 21, 20, 122].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [1468, 22, 150, 286, 739].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 4 round`, () => {
                const rounds = 4;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [491, 9, 52, 97, 248, 34].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [39, 45, 43, 258].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 5 round`, () => {
                const rounds = 5;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [15, 17, 16, 88, 1037].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [20, 110, 205, 524, 72].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 6 round`, () => {
                const rounds = 6;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [8, 70, 176, 26, 34].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [481, 32, 36, 186, 2190].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 7 round`, () => {
                const rounds = 7;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [162, 12, 14, 64, 732, 17].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [148, 372, 55, 72].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 8 round`, () => {
                const rounds = 8;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [51, 126, 20, 26, 136].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [343, 26, 30, 1546, 36].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 9 round`, () => {
                const rounds = 9;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [116, 10, 12, 517, 14].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [108, 267, 43, 55, 288].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 10 round`, () => {
                const rounds = 10;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [91, 16, 20, 98].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [481, 245, 22, 26, 1092, 30].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 15 round`, () => {
                const rounds = 15;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [83, 44, 8, 184, 9, 20, 26, 102].map(n => ({
                            worry: n,
                        }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [110, 36].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
            describe(`when executing 20 round`, () => {
                const rounds = 20;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkey(0).items).toEqual(
                        [10, 12, 14, 26, 34].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(1).items).toEqual(
                        [245, 93, 53, 199, 115].map(n => ({ worry: n }))
                    );
                    expect(monkeyInTheMiddle.getMonkey(2).items).toEqual([]);
                    expect(monkeyInTheMiddle.getMonkey(3).items).toEqual([]);
                });
            });
        });

        describe(`given a text input`, () => {
            const input = EXAMPLE_INPUT;
            it(`should get monkeys lines`, () => {
                expect(getMonkeyBusinessFromInputForPartOne(input)).toEqual(
                    10605
                );
            });
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`isDivisibleBy`, () => {
            describe(`given 0`, () => {
                const n = 0;
                it(`should return 0`, () => {
                    const divisor = 23;
                    expect(isDivisibleBy(n, divisor)).toBeFalsy();
                });
            });
            describe(`given 1`, () => {
                const n = 1;
                it(`should return 1`, () => {
                    const divisor = 23;
                    expect(isDivisibleBy(n, divisor)).toBeFalsy();
                });
            });
            describe(`given non divisible`, () => {
                const n = 22;
                it(`should return the same number`, () => {
                    const divisor = 23;
                    expect(isDivisibleBy(n, divisor)).toBeFalsy();
                });
            });
            describe(`given divisible once`, () => {
                const n = 2 * 23;
                it(`should return the same number`, () => {
                    const divisor = 23;
                    expect(isDivisibleBy(n, divisor)).toBeTruthy();
                });
            });
            describe(`given divisible twice`, () => {
                const n = 2 * 23 * 23;
                it(`should isDivisibleBy number`, () => {
                    const divisor = 23;
                    expect(isDivisibleBy(n, divisor)).toBeTruthy();
                });
            });
        });

        describe(`isDivisibleByEvery`, () => {
            describe(`given 0`, () => {
                const n = 0;
                it(`should return 0`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(isDivisibleByEvery(n, divisors)).toBeFalsy();
                });
            });
            describe(`given 1`, () => {
                const n = 1;
                it(`should return 1`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(isDivisibleByEvery(n, divisors)).toBeFalsy();
                });
            });
            describe(`given non divisible`, () => {
                const n = 22 * 18 * 12 * 16;
                it(`should return the same number`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(isDivisibleByEvery(n, divisors)).toBeFalsy();
                });
            });
            describe(`given divisible by some`, () => {
                const n = 23 * 19 * 13 * 16;
                it(`should return the same number`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(isDivisibleByEvery(n, divisors)).toBeFalsy();
                });
            });
            describe(`given divisible once`, () => {
                const n = 23 * 19 * 13 * 17;
                it(`should return the same number`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(isDivisibleByEvery(n, divisors)).toBeTruthy();
                });
            });
            describe(`given divisible twice`, () => {
                const n = 23 * 23 * 19 * 19 * 13 * 13 * 17 * 17;
                it(`should isDivisibleByEvery number`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(isDivisibleByEvery(n, divisors)).toBeTruthy();
                });
            });
        });

        describe(`isDivisibleAtLeastTwice`, () => {
            describe(`given 0`, () => {
                const n = 0;
                it(`should return 0`, () => {
                    const divisor = 23;
                    expect(isDivisibleAtLeastTwice(n, divisor)).toBeFalsy();
                });
            });
            describe(`given 1`, () => {
                const n = 1;
                it(`should return 1`, () => {
                    const divisor = 23;
                    expect(isDivisibleAtLeastTwice(n, divisor)).toBeFalsy();
                });
            });
            describe(`given non divisible`, () => {
                const n = 22;
                it(`should return the same number`, () => {
                    const divisor = 23;
                    expect(isDivisibleAtLeastTwice(n, divisor)).toBeFalsy();
                });
            });
            describe(`given divisible once`, () => {
                const n = 2 * 23;
                it(`should return the same number`, () => {
                    const divisor = 23;
                    expect(isDivisibleAtLeastTwice(n, divisor)).toBeFalsy();
                });
            });
            describe(`given divisible twice`, () => {
                const n = 2 * 23 * 23;
                it(`should isDivisibleAtLeastTwice number`, () => {
                    const divisor = 23;
                    expect(isDivisibleAtLeastTwice(n, divisor)).toBeTruthy();
                });
            });
        });

        describe(`simplify`, () => {
            describe(`given 0`, () => {
                const n = 0;
                it(`should return 0`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(simplify(n, divisors)).toEqual(0);
                });
            });
            describe(`given 1`, () => {
                const n = 1;
                it(`should return 1`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(simplify(n, divisors)).toEqual(1);
                });
            });
            describe(`given non divisible`, () => {
                const n = 22 * 18 * 12 * 16;
                it(`should return the same number`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(simplify(n, divisors)).toEqual(n);
                });
            });
            describe(`given divisible once`, () => {
                const n = 23 * 19 * 13 * 17;
                it(`should return the same number`, () => {
                    const divisors = [23, 19, 13, 17];
                    expect(simplify(n, divisors)).toEqual(n);
                });
            });
            describe(`given divisible twice`, () => {
                const n = 23 * 23 * 19 * 19 * 13 * 13 * 17 * 17;
                it(`should simplify number`, () => {
                    const divisors = [23, 19, 13, 17];
                    const simplified = simplify(n, divisors);
                    expect(simplified).toEqual(23 * 19 * 13 * 17);
                    expect(
                        isDivisibleByEvery(simplified, divisors)
                    ).toBeTruthy();
                });
            });
            describe(`given divisible twice with extra`, () => {
                const n = 3 * 23 * 23 * 19 * 19 * 13 * 13 * 17 * 17;
                it(`should simplify number`, () => {
                    const divisors = [23, 19, 13, 17];
                    const simplified = simplify(n, divisors);
                    expect(simplified).toEqual(3 * 23 * 19 * 13 * 17);
                    expect(
                        isDivisibleByEvery(simplified, divisors)
                    ).toBeTruthy();
                });
            });
        });

        describe(`given a monkeyInTheMiddle`, () => {
            const SHOULD_RELIEVE_WORRY = false;

            describe(`when executing 1 round`, () => {
                const rounds = 1;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkeysActivity()).toEqual([
                        2, 4, 3, 6,
                    ]);
                });
            });
            describe(`when executing 20 round`, () => {
                const rounds = 20;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkeysActivity()).toEqual([
                        99, 97, 8, 103,
                    ]);
                });
            });
            describe.skip(`when executing 10000 round`, () => {
                const rounds = 10000;
                it(`should get monkeys activity`, () => {
                    const monkeyInTheMiddle = new MonkeyInTheMiddle(
                        SHOULD_RELIEVE_WORRY,
                        rounds
                    );
                    monkeyInTheMiddle.parseInput(EXAMPLE_INPUT);
                    monkeyInTheMiddle.executeRounds(rounds);
                    expect(monkeyInTheMiddle.getMonkeysActivity()).toEqual([
                        52166, 47830, 1938, 52013,
                    ]);
                });
            });
        });

        describe(`given a text input`, () => {
            const input = EXAMPLE_INPUT;
            it(`should get monkeys lines`, () => {
                expect(getMonkeyBusinessFromInputForPartTwo(input)).toEqual(
                    2713310158
                );
            });
        });
    });
});
