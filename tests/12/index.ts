import { readFile, writeFile } from 'node:fs/promises';

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export class Position {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }

    clone(): Position {
        return new Position(this.x, this.y);
    }
}

export class Elevation {
    height: number;
    position: Position;
    distanceToStart: number = Number.POSITIVE_INFINITY;
    hasBeenVisited: boolean = false;

    constructor(height: number, position: Position) {
        this.height = height;
        this.position = position;
    }

    static parse(height: string, position: Position): Elevation {
        return new Elevation(height.charCodeAt(0), position);
    }

    clone(): Elevation {
        return new Elevation(this.height, this.position.clone());
    }

    isAccessibleFrom(other: Elevation): boolean {
        return this.height <= other.height + 1;
    }

    equals(other: Elevation): boolean {
        return this.position.equals(other.position);
    }
}

export class Grid {
    starts: Elevation[] = [];
    end!: Elevation;
    grid: Elevation[][] = [];

    constructor(starts: Elevation[], end: Elevation, grid: Elevation[][] = []) {
        this.starts = starts;
        this.end = end;
        this.grid = grid;
    }

    static parse(input: string, multipleStart = false): Grid {
        let starts: Elevation[] = [];
        let end!: Elevation;
        const grid: Elevation[][] = [];
        const lines = input.split('\n');
        lines.forEach((line, y) => {
            const row: Elevation[] = [];
            const points = line.split(``);
            points.forEach((p, x) => {
                const position = new Position(x, y);
                let elevation: Elevation;
                if (p === `S` || (multipleStart && p === `a`)) {
                    elevation = Elevation.parse(`a`, position);
                    starts.push(elevation);
                } else if (p === `E`) {
                    elevation = Elevation.parse(`z`, position);
                    end = elevation;
                } else {
                    elevation = Elevation.parse(p, position);
                }
                row.push(elevation);
            });
            grid.push(row);
        });
        return new Grid(starts, end, grid);
    }

    getHeight(): number {
        return this.grid.length;
    }

    getWidth(): number {
        if (this.getHeight() === 0) {
            return 0;
        }
        return this.grid[0].length;
    }

    getElevationAt(x: number, y: number): Elevation | undefined {
        if (
            !(0 <= x && x < this.getWidth() && 0 <= y && y < this.getHeight())
        ) {
            return undefined;
        }
        return this.grid[y][x];
    }

    getElevationAtPosition(position: Position): Elevation | undefined {
        return this.getElevationAt(position.x, position.y);
    }

    getElevations(): Elevation[] {
        return this.grid.flat();
    }

    resetVisited(): void {
        this.grid.forEach(row => {
            row.forEach(e => {
                e.hasBeenVisited = false;
            });
        });
    }

    getSmallestAmountOfSteps(): number {
        const solver = new PathSolver(this);
        return Math.min(...this.starts.map(start => solver.solve(start)));
    }
}

export class PathSolver {
    grid: Grid;
    unvisited!: Set<Elevation>;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    initUnvisited(): void {
        this.grid.resetVisited();
        this.unvisited = new Set(this.grid.getElevations());
    }

    getAbove(elevation: Elevation): Elevation | undefined {
        return this.grid.getElevationAt(
            elevation.position.x,
            elevation.position.y - 1
        );
    }

    getBelow(elevation: Elevation): Elevation | undefined {
        return this.grid.getElevationAt(
            elevation.position.x,
            elevation.position.y + 1
        );
    }

    getLeft(elevation: Elevation): Elevation | undefined {
        return this.grid.getElevationAt(
            elevation.position.x - 1,
            elevation.position.y
        );
    }

    getRight(elevation: Elevation): Elevation | undefined {
        return this.grid.getElevationAt(
            elevation.position.x + 1,
            elevation.position.y
        );
    }

    canVisit(from: Elevation, to: Elevation): boolean {
        return !to.hasBeenVisited && to.isAccessibleFrom(from);
    }

    getVisitableNeighbourgs(elevation: Elevation): Elevation[] {
        return [
            this.getAbove(elevation),
            this.getBelow(elevation),
            this.getLeft(elevation),
            this.getRight(elevation),
        ]
            .filter((e): e is Elevation => e !== undefined)
            .filter(e => this.canVisit(elevation, e));
    }

    getNextElevation(): Elevation | undefined {
        if (this.unvisited.size === 0) {
            return undefined;
        }
        let closest!: Elevation;
        this.unvisited.forEach(e => {
            if (
                closest === undefined ||
                e.distanceToStart < closest.distanceToStart
            ) {
                closest = e;
            }
        });
        return closest;
    }

    solveRecursive(elevation: Elevation): number {
        // this.debug();
        elevation.hasBeenVisited = true;
        this.unvisited.delete(elevation);
        const neighbourgs = this.getVisitableNeighbourgs(elevation);
        for (const n of neighbourgs) {
            n.distanceToStart = Math.min(
                n.distanceToStart,
                elevation.distanceToStart + 1
            );
            if (n === this.grid.end) {
                return n.distanceToStart;
            }
        }
        const next = this.getNextElevation();
        if (!next) {
            return Number.POSITIVE_INFINITY;
        }
        return this.solveRecursive(next);
    }

    solve(start: Elevation): number {
        start.distanceToStart = 0;
        this.initUnvisited();
        return this.solveRecursive(start);
    }

    debug(): void {
        let debug = ``;
        this.grid.grid.forEach(row => {
            row.forEach(elevation => {
                if (this.grid.starts.some(start => elevation.equals(start))) {
                    debug += `S`;
                } else if (elevation.equals(this.grid.end)) {
                    debug += `E`;
                } else if (elevation.hasBeenVisited) {
                    debug += `.`;
                } else {
                    debug += String.fromCharCode(elevation.height);
                }
            });
            debug += '\n';
        });
        console.log(debug);
    }
}

export function getSmallestAmountOfStepsForPartOne(input: string): number {
    const grid = Grid.parse(input);
    return grid.getSmallestAmountOfSteps();
}

export function getSmallestAmountOfStepsForPartTwo(input: string): number {
    const grid = Grid.parse(input, true);
    return grid.getSmallestAmountOfSteps();
}

export function computeOutput(input: string): string {
    const business = getSmallestAmountOfStepsForPartTwo(input);
    return business.toString();
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
