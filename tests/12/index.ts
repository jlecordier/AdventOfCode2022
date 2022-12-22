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
    isADeadEnd: boolean = false;

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
    start!: Elevation;
    end!: Elevation;
    grid: Elevation[][] = [];

    constructor(start: Elevation, end: Elevation, grid: Elevation[][] = []) {
        this.start = start;
        this.end = end;
        this.grid = grid;
    }

    static parse(input: string): Grid {
        let start!: Elevation;
        let end!: Elevation;
        const grid: Elevation[][] = [];
        const lines = input.split('\n');
        lines.forEach((line, y) => {
            const row: Elevation[] = [];
            const points = line.split(``);
            points.forEach((p, x) => {
                const position = new Position(x, y);
                let elevation: Elevation;
                if (p === `S`) {
                    elevation = Elevation.parse(`a`, position);
                    start = elevation;
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
        return new Grid(start, end, grid);
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

    getSmallestAmountOfSteps(): number {
        const solver = new PathSolver(this, [this.start]);
        return solver.solve();
    }
}

export class PathSolver {
    grid: Grid;
    path: Elevation[];

    constructor(grid: Grid, path: Elevation[]) {
        this.grid = grid;
        this.path = path;
    }

    get current(): Elevation {
        return this.path[this.path.length - 1];
    }

    getAbove(): Elevation | undefined {
        return this.grid.getElevationAt(
            this.current.position.x,
            this.current.position.y - 1
        );
    }

    getBelow(): Elevation | undefined {
        return this.grid.getElevationAt(
            this.current.position.x,
            this.current.position.y + 1
        );
    }

    getLeft(): Elevation | undefined {
        return this.grid.getElevationAt(
            this.current.position.x - 1,
            this.current.position.y
        );
    }

    getRight(): Elevation | undefined {
        return this.grid.getElevationAt(
            this.current.position.x + 1,
            this.current.position.y
        );
    }

    hasAlreadyVisited(elevation: Elevation): boolean {
        return this.path.some(e => e.equals(elevation));
    }

    canVisit(elevation: Elevation): boolean {
        return (
            !this.hasAlreadyVisited(elevation) &&
            elevation.isAccessibleFrom(this.current) &&
            !elevation.isADeadEnd
        );
    }

    getDeltaToEnd(): Position {
        return new Position(
            this.grid.end.position.x - this.current.position.x,
            this.grid.end.position.y - this.current.position.y
        );
    }

    getOrderedNeighbourgs(): (Elevation | undefined)[] {
        const delta = this.getDeltaToEnd();
        const isUpLeft = delta.x < 0 && delta.y < 0;
        if (isUpLeft) {
            return [
                this.getAbove(),
                this.getLeft(),
                this.getBelow(),
                this.getRight(),
            ];
        }
        const isUp = delta.x === 0 && delta.y < 0;
        if (isUp) {
            return [
                this.getAbove(),
                this.getLeft(),
                this.getRight(),
                this.getBelow(),
            ];
        }
        const isUpRight = delta.x > 0 && delta.y < 0;
        if (isUpRight) {
            return [
                this.getAbove(),
                this.getRight(),
                this.getBelow(),
                this.getLeft(),
            ];
        }
        const isRight = delta.x > 0 && delta.y === 0;
        if (isRight) {
            return [
                this.getRight(),
                this.getAbove(),
                this.getBelow(),
                this.getLeft(),
            ];
        }
        const isRightDown = delta.x > 0 && delta.y > 0;
        if (isRightDown) {
            return [
                this.getRight(),
                this.getBelow(),
                this.getLeft(),
                this.getAbove(),
            ];
        }
        const isDown = delta.x === 0 && delta.y > 0;
        if (isDown) {
            return [
                this.getBelow(),
                this.getLeft(),
                this.getRight(),
                this.getAbove(),
            ];
        }
        const isDownLeft = delta.x < 0 && delta.y > 0;
        if (isDownLeft) {
            return [
                this.getBelow(),
                this.getLeft(),
                this.getAbove(),
                this.getRight(),
            ];
        }
        const isLeft = delta.x < 0 && delta.y === 0;
        if (isLeft) {
            return [
                this.getLeft(),
                this.getAbove(),
                this.getBelow(),
                this.getRight(),
            ];
        }
        return [
            this.getLeft(),
            this.getAbove(),
            this.getBelow(),
            this.getRight(),
        ];
    }

    getVisitableNeighbourgs(): Elevation[] {
        return this.getOrderedNeighbourgs()
            .filter((e): e is Elevation => e !== undefined)
            .filter(e => this.canVisit(e));
    }

    solve(): number {
        if (this.current.equals(this.grid.end)) {
            this.debug();
            return this.path.length - 1;
        }
        const neighbourgs = this.getVisitableNeighbourgs();
        if (neighbourgs.length === 0) {
            this.current.isADeadEnd = true;
            return Infinity;
        }
        return Math.min(
            ...neighbourgs.map(e => {
                const solver = new PathSolver(this.grid, [...this.path, e]);
                return solver.solve();
            })
        );
    }

    debug(): void {
        let debug = ``;
        this.grid.grid.forEach(row => {
            row.forEach(elevation => {
                if (elevation.equals(this.grid.start)) {
                    debug += `S`;
                } else if (elevation.equals(this.grid.end)) {
                    debug += `E`;
                } else if (elevation.isADeadEnd) {
                    debug += `x`;
                } else if (this.hasAlreadyVisited(elevation)) {
                    debug += `o`;
                } else {
                    debug += String.fromCharCode(elevation.height);
                }
            });
            debug += '\n';
        });
        console.log(debug);
    }
}

export function getSmallestAmountOfSteps(input: string): number {
    const grid = Grid.parse(input);
    return grid.getSmallestAmountOfSteps();
}

export function computeOutput(input: string): string {
    const business = getSmallestAmountOfSteps(input);
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
