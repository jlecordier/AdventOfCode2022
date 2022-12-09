import { readFile, writeFile } from 'node:fs/promises';

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

export interface Tree {
    height: number;
    visible: boolean;
}

export class Grid {
    rows: Tree[][] = [];

    getWidth(): number {
        return this.rows[0].length;
    }

    getHeight(): number {
        return this.rows.length;
    }

    addRow(row: string): void {
        this.rows.push(
            row.split(``).map(height => ({ height: +height, visible: false }))
        );
    }
    addRows(rows: string[]): void {
        rows.forEach(row => this.addRow(row));
    }

    getRow(index: number): Tree[] {
        return this.rows[index];
    }

    getRowFromLeft(index: number): Tree[] {
        return this.getRow(index);
    }

    getRowFromRight(index: number): Tree[] {
        return [...this.getRow(index)].reverse();
    }

    getColumn(index: number): Tree[] {
        return this.rows.map(row => row[index]);
    }

    getColumnFromTop(index: number): Tree[] {
        return this.getColumn(index);
    }

    getColumnFromBottom(index: number): Tree[] {
        return [...this.getColumn(index)].reverse();
    }

    getTree(row: number, column: number): Tree {
        return this.getRow(row)[column];
    }

    getTreesAbove(row: number, column: number): Tree[] {
        return [...this.getColumnFromTop(column).slice(0, row)].reverse();
    }

    getTreesBelow(row: number, column: number): Tree[] {
        return this.getColumnFromTop(column).slice(row + 1);
    }

    getTreesOnTheLeft(row: number, column: number): Tree[] {
        return [...this.getRowFromLeft(row).slice(0, column)].reverse();
    }

    getTreesOnTheRight(row: number, column: number): Tree[] {
        return this.getRowFromLeft(row).slice(column + 1);
    }

    getNumberOfVisibleTrees(): number {
        return sum(
            this.rows.map(row => row.filter(tree => tree.visible).length)
        );
    }

    getScenicScore(row: number, column: number): number {
        const tree = this.getTree(row, column);
        return (
            getViewingDistance(tree.height, this.getTreesAbove(row, column)) *
            getViewingDistance(tree.height, this.getTreesBelow(row, column)) *
            getViewingDistance(
                tree.height,
                this.getTreesOnTheLeft(row, column)
            ) *
            getViewingDistance(
                tree.height,
                this.getTreesOnTheRight(row, column)
            )
        );
    }
}

const MIN_TREE_HEIGHT = 0;
const MAX_TREE_HEIGHT = 9;
export function updateTreesVisibility(trees: Tree[]): void {
    let maxHeight = MIN_TREE_HEIGHT - 1;
    let index = 0;
    while (maxHeight < MAX_TREE_HEIGHT && index < trees.length) {
        const tree = trees[index];
        if (tree.height > maxHeight) {
            maxHeight = tree.height;
            tree.visible = true;
        }
        index++;
    }
}

export function getViewingDistance(fromHeight: number, trees: Tree[]): number {
    for (let index = 0; index < trees.length; index++) {
        const tree = trees[index];
        if (tree.height >= fromHeight) {
            return index + 1;
        }
    }
    return trees.length;
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export function getNumberOfVisibleTreesFromInput(input: string): number {
    const rows = getLines(input);
    const grid = new Grid();
    grid.addRows(rows);
    const width = grid.getWidth();
    const height = grid.getHeight();
    for (let row = 0; row < height; row++) {
        updateTreesVisibility(grid.getRowFromLeft(row));
        updateTreesVisibility(grid.getRowFromRight(row));
    }
    for (let column = 0; column < width; column++) {
        updateTreesVisibility(grid.getColumnFromTop(column));
        updateTreesVisibility(grid.getColumnFromBottom(column));
    }
    return grid.getNumberOfVisibleTrees();
}

export function getHighestScenicScoreFromInput(input: string): number {
    const rows = getLines(input);
    const grid = new Grid();
    grid.addRows(rows);
    const width = grid.getWidth();
    const height = grid.getHeight();
    const scores = [];
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            scores.push(grid.getScenicScore(row, column));
        }
    }
    return Math.max(...scores);
}

export function computeOutput(input: string): string {
    const points = getHighestScenicScoreFromInput(input);
    return points.toString();
}

export function readInput(): Promise<string> {
    return readFile(new URL('./input.txt', import.meta.url), `utf-8`);
}

export function writeOutput(output: string): Promise<void> {
    return writeFile(new URL('./output.txt', import.meta.url), output, `utf-8`);
}

async function index(): Promise<string> {
    const input = await readInput();
    const output = computeOutput(input);
    await writeOutput(output);
    return output;
}

index()
    .then(output => console.log(output))
    .catch(error => console.error(error));
