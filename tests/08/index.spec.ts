import { describe, expect, it } from 'vitest';
import {
    getHighestScenicScoreFromInput,
    getNumberOfVisibleTreesFromInput,
    getViewingDistance,
    Grid,
    Tree,
    updateTreesVisibility,
} from './index';

describe(`Day 08`, () => {
    describe(`-- Part One --`, () => {
        describe(`given a grid`, () => {
            const grid = new Grid();
            grid.rows = [
                [
                    { height: 3, visible: false },
                    { height: 0, visible: false },
                    { height: 3, visible: false },
                    { height: 7, visible: false },
                    { height: 3, visible: false },
                ],
                [
                    { height: 2, visible: false },
                    { height: 5, visible: false },
                    { height: 5, visible: false },
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                ],
                [
                    { height: 6, visible: false },
                    { height: 5, visible: false },
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                    { height: 2, visible: false },
                ],
                [
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                    { height: 5, visible: false },
                    { height: 4, visible: false },
                    { height: 9, visible: false },
                ],
                [
                    { height: 3, visible: false },
                    { height: 5, visible: false },
                    { height: 3, visible: false },
                    { height: 9, visible: false },
                    { height: 0, visible: false },
                ],
            ];
            it(`should get row from left`, () => {
                expect(grid.getRowFromLeft(0)).toEqual([
                    { height: 3, visible: false },
                    { height: 0, visible: false },
                    { height: 3, visible: false },
                    { height: 7, visible: false },
                    { height: 3, visible: false },
                ]);
            });
            it(`should get row from right`, () => {
                expect(grid.getRowFromRight(0)).toEqual([
                    { height: 3, visible: false },
                    { height: 7, visible: false },
                    { height: 3, visible: false },
                    { height: 0, visible: false },
                    { height: 3, visible: false },
                ]);
            });
            it(`should get column from top`, () => {
                expect(grid.getColumnFromTop(0)).toEqual([
                    { height: 3, visible: false },
                    { height: 2, visible: false },
                    { height: 6, visible: false },
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                ]);
            });
            it(`should get column from bottom`, () => {
                expect(grid.getColumnFromBottom(0)).toEqual([
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                    { height: 6, visible: false },
                    { height: 2, visible: false },
                    { height: 3, visible: false },
                ]);
            });
            it(`should get trees above`, () => {
                expect(grid.getTreesAbove(1, 2)).toEqual([
                    { height: 3, visible: false },
                ]);
            });
            it(`should get trees below`, () => {
                expect(grid.getTreesBelow(1, 2)).toEqual([
                    { height: 3, visible: false },
                    { height: 5, visible: false },
                    { height: 3, visible: false },
                ]);
            });
            it(`should get trees on the left`, () => {
                expect(grid.getTreesOnTheLeft(1, 2)).toEqual([
                    { height: 5, visible: false },
                    { height: 2, visible: false },
                ]);
            });
            it(`should get trees on the right`, () => {
                expect(grid.getTreesOnTheRight(1, 2)).toEqual([
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                ]);
            });
        });

        describe(`updateTreesVisibility`, () => {
            it(`should update tree visibility`, () => {
                const trees = [
                    { height: 0, visible: false },
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                    { height: 3, visible: false },
                    { height: 4, visible: false },
                    { height: 5, visible: false },
                ];
                const expected = [
                    { height: 0, visible: true },
                    { height: 1, visible: true },
                    { height: 2, visible: true },
                    { height: 3, visible: true },
                    { height: 4, visible: true },
                    { height: 5, visible: true },
                ];
                updateTreesVisibility(trees);
                expect(trees).toEqual(expected);
            });
            it(`should update tree visibility`, () => {
                const trees = [
                    { height: 0, visible: false },
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                    { height: 3, visible: false },
                    { height: 2, visible: false },
                    { height: 1, visible: false },
                ];
                const expected = [
                    { height: 0, visible: true },
                    { height: 1, visible: true },
                    { height: 2, visible: true },
                    { height: 3, visible: true },
                    { height: 2, visible: false },
                    { height: 1, visible: false },
                ];
                updateTreesVisibility(trees);
                expect(trees).toEqual(expected);
            });
            it(`should update tree visibility`, () => {
                const trees = [
                    { height: 0, visible: false },
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                ];
                const expected = [
                    { height: 0, visible: true },
                    { height: 1, visible: true },
                    { height: 2, visible: true },
                    { height: 3, visible: true },
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                ];
                updateTreesVisibility(trees);
                expect(trees).toEqual(expected);
            });
            it(`should update tree visibility`, () => {
                const trees = [
                    { height: 0, visible: false },
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                    { height: 2, visible: false },
                    { height: 3, visible: false },
                    { height: 4, visible: false },
                ];
                const expected = [
                    { height: 0, visible: true },
                    { height: 1, visible: true },
                    { height: 2, visible: true },
                    { height: 2, visible: false },
                    { height: 3, visible: true },
                    { height: 4, visible: true },
                ];
                updateTreesVisibility(trees);
                expect(trees).toEqual(expected);
            });
            it(`should update tree visibility`, () => {
                const trees = [
                    { height: 5, visible: false },
                    { height: 6, visible: false },
                    { height: 7, visible: false },
                    { height: 8, visible: false },
                    { height: 9, visible: false },
                    { height: 9, visible: false },
                ];
                const expected = [
                    { height: 5, visible: true },
                    { height: 6, visible: true },
                    { height: 7, visible: true },
                    { height: 8, visible: true },
                    { height: 9, visible: true },
                    { height: 9, visible: false },
                ];
                updateTreesVisibility(trees);
                expect(trees).toEqual(expected);
            });
        });

        describe(`given a text input`, () => {
            const input = `30373
25512
65332
33549
35390`;
            it(`should get the number of trees visible from outside`, () => {
                expect(getNumberOfVisibleTreesFromInput(input)).toEqual(21);
            });
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`getNumberOfVisibleTrees`, () => {
            it(`should get the number of visible trees`, () => {
                const trees: Tree[] = [];
                expect(getViewingDistance(5, trees)).toEqual(0);
            });
            it(`should get the number of visible trees`, () => {
                const trees = [
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                ];
                expect(getViewingDistance(5, trees)).toEqual(2);
            });
            it(`should get the number of visible trees`, () => {
                const trees = [
                    { height: 5, visible: false },
                    { height: 2, visible: false },
                ];
                expect(getViewingDistance(5, trees)).toEqual(1);
            });
            it(`should get the number of visible trees`, () => {
                const trees = [{ height: 3, visible: false }];
                expect(getViewingDistance(5, trees)).toEqual(1);
            });
            it(`should get the number of visible trees`, () => {
                const trees = [
                    { height: 3, visible: false },
                    { height: 5, visible: false },
                    { height: 3, visible: false },
                ];
                expect(getViewingDistance(5, trees)).toEqual(2);
            });
        });

        describe(`given a grid`, () => {
            const grid = new Grid();
            grid.rows = [
                [
                    { height: 3, visible: false },
                    { height: 0, visible: false },
                    { height: 3, visible: false },
                    { height: 7, visible: false },
                    { height: 3, visible: false },
                ],
                [
                    { height: 2, visible: false },
                    { height: 5, visible: false },
                    { height: 5, visible: false },
                    { height: 1, visible: false },
                    { height: 2, visible: false },
                ],
                [
                    { height: 6, visible: false },
                    { height: 5, visible: false },
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                    { height: 2, visible: false },
                ],
                [
                    { height: 3, visible: false },
                    { height: 3, visible: false },
                    { height: 5, visible: false },
                    { height: 4, visible: false },
                    { height: 9, visible: false },
                ],
                [
                    { height: 3, visible: false },
                    { height: 5, visible: false },
                    { height: 3, visible: false },
                    { height: 9, visible: false },
                    { height: 0, visible: false },
                ],
            ];
            it(`should get scenic score`, () => {
                expect(grid.getScenicScore(1, 2)).toEqual(1 * 1 * 2 * 2);
            });
            it(`should get scenic score`, () => {
                expect(grid.getScenicScore(3, 2)).toEqual(2 * 2 * 1 * 2);
            });
        });

        describe(`given a text input`, () => {
            const input = `30373
25512
65332
33549
35390`;
            it(`shoulg get the highest scenic score`, () => {
                expect(getHighestScenicScoreFromInput(input)).toEqual(8);
            });
        });
    });
});
