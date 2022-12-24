import { describe, expect, it } from 'vitest';
import {
    Elevation,
    getSmallestAmountOfStepsForPartOne,
    getSmallestAmountOfStepsForPartTwo,
    Grid,
    PathSolver,
    Position,
} from './index';

const EXAMPLE_INPUT = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe(`Day 11`, () => {
    describe(`-- Part One --`, () => {
        describe(`given an elevation`, () => {
            describe(`when testing from a higher elevation`, () => {
                it(`should be accessible`, () => {
                    const high = new Elevation(20, new Position(0, 0));
                    const low = new Elevation(10, new Position(0, 1));
                    expect(low.isAccessibleFrom(high)).toBeTruthy();
                });
            });
            describe(`when testing from a lower elevation`, () => {
                it(`should be accessible`, () => {
                    const high = new Elevation(20, new Position(0, 0));
                    const low = new Elevation(10, new Position(0, 1));
                    expect(high.isAccessibleFrom(low)).toBeFalsy();
                });
            });
            describe(`when testing from an equel elevation`, () => {
                it(`should be accessible`, () => {
                    const equal1 = new Elevation(10, new Position(0, 0));
                    const equal2 = new Elevation(10, new Position(0, 1));
                    expect(equal1.isAccessibleFrom(equal2)).toBeTruthy();
                    expect(equal2.isAccessibleFrom(equal1)).toBeTruthy();
                });
            });
        });

        describe(`given a grid`, () => {
            it(`should return the width`, () => {
                const grid = Grid.parse(EXAMPLE_INPUT);
                expect(grid.getWidth()).toEqual(8);
                expect(grid.getHeight()).toEqual(5);
            });
            it(`should return the height`, () => {
                const grid = Grid.parse(EXAMPLE_INPUT);
                expect(grid.getElevationAt(-1, 0)).toBeUndefined();
                expect(grid.getElevationAt(10, 0)).toBeUndefined();
                expect(grid.getElevationAt(0, -1)).toBeUndefined();
                expect(grid.getElevationAt(0, 10)).toBeUndefined();
            });
            describe(`when requesting an out of bound elevation`, () => {
                it(`should return undefined`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    expect(grid.getElevationAt(-1, 0)).toBeUndefined();
                    expect(grid.getElevationAt(10, 0)).toBeUndefined();
                    expect(grid.getElevationAt(0, -1)).toBeUndefined();
                    expect(grid.getElevationAt(0, 10)).toBeUndefined();
                });
            });
            describe(`when requesting an in bound elevation`, () => {
                it(`should return the correct elevation`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    expect(
                        grid
                            .getElevationAt(1, 0)
                            ?.equals(
                                new Elevation(
                                    `a`.charCodeAt(0),
                                    new Position(1, 0)
                                )
                            )
                    ).toBeTruthy();
                });
            });
            describe(`when requesting with an out of bound position`, () => {
                it(`should return undefined`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    expect(
                        grid.getElevationAtPosition(new Position(-1, 0))
                    ).toBeUndefined();
                    expect(
                        grid.getElevationAtPosition(new Position(10, 0))
                    ).toBeUndefined();
                    expect(
                        grid.getElevationAtPosition(new Position(0, -1))
                    ).toBeUndefined();
                    expect(
                        grid.getElevationAtPosition(new Position(0, 10))
                    ).toBeUndefined();
                });
            });
        });

        describe(`given a path solver`, () => {
            it(`should get the correct neighbourg`, () => {
                const grid = Grid.parse(EXAMPLE_INPUT);
                const pathSolver = new PathSolver(grid);
                expect(pathSolver.getAbove(grid.start)).toBeUndefined();
                expect(pathSolver.getLeft(grid.start)).toBeUndefined();
                expect(
                    pathSolver
                        .getBelow(grid.start)
                        ?.equals(
                            new Elevation(`a`.charCodeAt(0), new Position(0, 1))
                        )
                ).toBeTruthy();
                expect(
                    pathSolver
                        .getRight(grid.start)
                        ?.equals(
                            new Elevation(`a`.charCodeAt(0), new Position(1, 0))
                        )
                ).toBeTruthy();
            });
        });

        describe(`given a simple text input`, () => {
            const input = `Sa
aE`;
            it(`should parse the grid`, () => {
                const grid = Grid.parse(input);
                expect(
                    grid.start.equals(
                        new Elevation(`a`.charCodeAt(0), new Position(0, 0))
                    )
                ).toBeTruthy();
                expect(
                    grid
                        .getElevationAt(0, 1)
                        ?.equals(
                            new Elevation(`z`.charCodeAt(0), new Position(0, 1))
                        )
                ).toBeTruthy();
                expect(
                    grid
                        .getElevationAt(1, 0)
                        ?.equals(
                            new Elevation(`z`.charCodeAt(0), new Position(1, 0))
                        )
                ).toBeTruthy();
                expect(
                    grid.end.equals(
                        new Elevation(`z`.charCodeAt(0), new Position(1, 1))
                    )
                ).toBeTruthy();
            });
        });

        describe(`given a text input`, () => {
            it(`should return the smallest amount of steps`, () => {
                expect(
                    getSmallestAmountOfStepsForPartOne(EXAMPLE_INPUT)
                ).toEqual(31);
            });
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`given a text input`, () => {
            it(`should return the smallest amount of steps`, () => {
                expect(
                    getSmallestAmountOfStepsForPartTwo(EXAMPLE_INPUT)
                ).toEqual(29);
            });
        });
    });
});
