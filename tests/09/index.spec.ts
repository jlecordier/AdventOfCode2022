import { describe, expect, it } from 'vitest';
import {
    getNumberOfVisitedCellsFromInputForPartOne,
    getNumberOfVisitedCellsFromInputForPartTwo,
    getUniquePositions,
    Grid,
} from './index';

describe(`Day 09`, () => {
    describe(`-- Part One --`, () => {
        describe(`given a grid`, () => {
            describe(`when moving right by 4`, () => {
                const grid = new Grid(2);
                const lines = [`R 4`];
                grid.readLines(lines);
                it(`should change the head position and the tail position`, () => {
                    expect(grid.head.getPosition()).toEqual({ x: 4, y: 0 });
                    expect(grid.tail.getPosition()).toEqual({ x: 3, y: 0 });
                });
            });

            describe(`when moving up by 4`, () => {
                const grid = new Grid(2);
                const lines = [`R 4`, `U 4`];
                grid.readLines(lines);
                it(`should change the head position and the tail position`, () => {
                    expect(grid.head.getPosition()).toEqual({ x: 4, y: 4 });
                    expect(grid.tail.getPosition()).toEqual({ x: 4, y: 3 });
                });
            });

            describe(`when moving left by 3`, () => {
                const grid = new Grid(2);
                const lines = [`R 4`, `U 4`, `L 3`];
                grid.readLines(lines);
                it(`should change the head position and the tail position`, () => {
                    expect(grid.head.getPosition()).toEqual({ x: 1, y: 4 });
                    expect(grid.tail.getPosition()).toEqual({ x: 2, y: 4 });
                });
            });

            describe(`when moving down by 1`, () => {
                const grid = new Grid(2);
                const lines = [`R 4`, `U 4`, `L 3`, `D 1`];
                grid.readLines(lines);
                it(`should change the head position and the tail position`, () => {
                    expect(grid.head.getPosition()).toEqual({ x: 1, y: 3 });
                    expect(grid.tail.getPosition()).toEqual({ x: 2, y: 4 });
                });
            });

            it(`should register every tail position`, () => {
                const grid = new Grid(2);
                const lines = [
                    `R 4`, // 1
                    `U 4`, // 2
                    `L 3`, // 3
                    `D 1`, // 4
                    `R 4`, // 5
                    `D 1`, // 6
                    `L 5`, // 7
                    `R 2`, // 8
                ];
                grid.readLines(lines);
                expect(grid.tailPositionsHistory).toEqual([
                    { x: 0, y: 0 }, // 0 H:{ x: 0, y: 0 }

                    { x: 0, y: 0 }, // 1 H:{ x: 1, y: 0 }
                    { x: 1, y: 0 }, // 1 H:{ x: 2, y: 0 }
                    { x: 2, y: 0 }, // 1 H:{ x: 3, y: 0 }
                    { x: 3, y: 0 }, // 1 H:{ x: 4, y: 0 }

                    { x: 3, y: 0 }, // 2 H:{ x: 4, y: 1 }
                    { x: 4, y: 1 }, // 2 H:{ x: 4, y: 2 }
                    { x: 4, y: 2 }, // 2 H:{ x: 4, y: 3 }
                    { x: 4, y: 3 }, // 2 H:{ x: 4, y: 4 }

                    { x: 4, y: 3 }, // 3 H:{ x: 3, y: 4 }
                    { x: 3, y: 4 }, // 3 H:{ x: 2, y: 4 }
                    { x: 2, y: 4 }, // 3 H:{ x: 1, y: 4 }

                    { x: 2, y: 4 }, // 4 H:{ x: 1, y: 3 }

                    { x: 2, y: 4 }, // 5 H:{ x: 2, y: 3 }
                    { x: 2, y: 4 }, // 5 H:{ x: 3, y: 3 }
                    { x: 3, y: 3 }, // 5 H:{ x: 4, y: 3 }
                    { x: 4, y: 3 }, // 5 H:{ x: 5, y: 3 }

                    { x: 4, y: 3 }, // 6 H:{ x: 5, y: 2 }

                    { x: 4, y: 3 }, // 7 H:{ x: 4, y: 2 }
                    { x: 4, y: 3 }, // 7 H:{ x: 3, y: 2 }
                    { x: 3, y: 2 }, // 7 H:{ x: 2, y: 2 }
                    { x: 2, y: 2 }, // 7 H:{ x: 1, y: 2 }
                    { x: 1, y: 2 }, // 7 H:{ x: 0, y: 2 }

                    { x: 1, y: 2 }, // 8 H:{ x: 1, y: 2 }
                    { x: 1, y: 2 }, // 8 H:{ x: 2, y: 2 }
                ]);
            });
        });

        describe(`given positions`, () => {
            it(`should get unique positions`, () => {
                const positions = [
                    { x: 0, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 },
                    { x: 3, y: 0 },
                    { x: 4, y: 1 },
                    { x: 4, y: 2 },
                    { x: 4, y: 3 },
                    { x: 4, y: 3 },
                    { x: 3, y: 4 },
                    { x: 2, y: 4 },
                    { x: 2, y: 4 },
                    { x: 2, y: 4 },
                    { x: 2, y: 4 },
                    { x: 3, y: 3 },
                    { x: 4, y: 3 },
                    { x: 4, y: 3 },
                    { x: 4, y: 3 },
                    { x: 4, y: 3 },
                    { x: 3, y: 2 },
                    { x: 2, y: 2 },
                    { x: 1, y: 2 },
                    { x: 1, y: 2 },
                    { x: 1, y: 2 },
                ];
                expect(getUniquePositions(positions)).toEqual([
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 },
                    { x: 4, y: 1 },
                    { x: 4, y: 2 },
                    { x: 4, y: 3 },
                    { x: 3, y: 4 },
                    { x: 2, y: 4 },
                    { x: 3, y: 3 },
                    { x: 3, y: 2 },
                    { x: 2, y: 2 },
                    { x: 1, y: 2 },
                ]);
            });
        });

        describe(`given a text input`, () => {
            const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
            it(`should get the number of visited cells`, () => {
                expect(
                    getNumberOfVisitedCellsFromInputForPartOne(input)
                ).toEqual(13);
            });
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`given a text input`, () => {
            const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
            it(`should get the number of visited cells`, () => {
                expect(
                    getNumberOfVisitedCellsFromInputForPartTwo(input)
                ).toEqual(36);
            });
        });
    });
});
