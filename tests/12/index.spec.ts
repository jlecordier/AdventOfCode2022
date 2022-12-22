import { describe, expect, it } from 'vitest';
import {
    Elevation,
    getSmallestAmountOfSteps,
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
                const pathSolver = new PathSolver(grid, [grid.start]);
                expect(pathSolver.getAbove()).toBeUndefined();
                expect(pathSolver.getLeft()).toBeUndefined();
                expect(
                    pathSolver
                        .getBelow()
                        ?.equals(
                            new Elevation(`a`.charCodeAt(0), new Position(0, 1))
                        )
                ).toBeTruthy();
                expect(
                    pathSolver
                        .getRight()
                        ?.equals(
                            new Elevation(`a`.charCodeAt(0), new Position(1, 0))
                        )
                ).toBeTruthy();
            });
            describe(`when testing a non visited elevation`, () => {
                it(`should not have already visited`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    const pathSolver = new PathSolver(grid, [grid.start]);
                    const below = pathSolver.getBelow()!;
                    expect(pathSolver.hasAlreadyVisited(below)).toBeFalsy();
                });
                it(`should return true`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    const pathSolver = new PathSolver(grid, [grid.start]);
                    const below = pathSolver.getBelow()!;
                    expect(pathSolver.canVisit(below)).toBeTruthy();
                });
            });
            describe(`when testing an already visited elevation`, () => {
                it(`should have already visited`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    const pathSolver = new PathSolver(grid, [grid.start]);
                    const below = pathSolver.getBelow()!;
                    const pathSolverBelow = new PathSolver(grid, [
                        ...pathSolver.path,
                        below,
                    ]);
                    expect(
                        pathSolverBelow.hasAlreadyVisited(grid.start)
                    ).toBeTruthy();
                });
                it(`should return false`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    const pathSolver = new PathSolver(grid, [grid.start]);
                    const below = pathSolver.getBelow()!;
                    const pathSolverBelow = new PathSolver(grid, [
                        ...pathSolver.path,
                        below,
                    ]);
                    expect(pathSolverBelow.canVisit(grid.start)).toBeFalsy();
                });
            });
            describe(`when testing a too high elevation`, () => {
                it(`should return false`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    const right1 = grid.getElevationAt(1, 0)!;
                    const right2 = grid.getElevationAt(2, 0)!;
                    const pathSolver = new PathSolver(grid, [
                        grid.start,
                        right1,
                        right2,
                    ]);
                    const right3 = pathSolver.getRight()!;
                    expect(pathSolver.canVisit(right3)).toBeFalsy();
                });
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
            describe(`when given a solved path`, () => {
                it(`should return the path length`, () => {
                    const grid = Grid.parse(EXAMPLE_INPUT);
                    const right1 = grid.getElevationAt(1, 0)!;
                    const right2 = grid.getElevationAt(2, 0)!;
                    const pathSolver = new PathSolver(grid, [
                        grid.start,
                        right1,
                        right2,
                    ]);
                    const right3 = pathSolver.getRight()!;
                    expect(pathSolver.canVisit(right3)).toBeFalsy();
                });
            });
        });

        describe(`given a text input`, () => {
            it(`should return the smallest amount of steps`, () => {
                expect(getSmallestAmountOfSteps(EXAMPLE_INPUT)).toEqual(31);
            });
        });
    });
});
