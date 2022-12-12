import { readFile, writeFile } from 'node:fs/promises';

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export interface Position {
    x: number;
    y: number;
}

export type Direction = `U` | `L` | `D` | `R`;

export class Point {
    position: Position = { x: 0, y: 0 };

    moveUp(): void {
        this.position.y++;
    }

    moveDown(): void {
        this.position.y--;
    }

    moveLeft(): void {
        this.position.x--;
    }

    moveRight(): void {
        this.position.x++;
    }

    moveUpLeft(): void {
        this.moveUp();
        this.moveLeft();
    }

    moveUpRight(): void {
        this.moveUp();
        this.moveRight();
    }

    moveDownLeft(): void {
        this.moveDown();
        this.moveLeft();
    }

    moveDownRight(): void {
        this.moveDown();
        this.moveRight();
    }

    moveInDirection(direction: Direction): void {
        switch (direction) {
            case `U`:
                this.moveUp();
                break;
            case `D`:
                this.moveDown();
                break;
            case `L`:
                this.moveLeft();
                break;
            case `R`:
                this.moveRight();
                break;
        }
    }

    getDistanceTo(other: Point): number {
        return getDistanceBetweenPoints(this, other);
    }

    getPositionDelta(other: Point): Position {
        return getPositionDelta(this.position, other.position);
    }
}

export function getDistanceBetweenPositions(
    from: Position,
    to: Position
): number {
    return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
}

export function getDistanceBetweenPoints(from: Point, to: Point): number {
    return getDistanceBetweenPositions(from.position, to.position);
}

export function getPositionDelta(from: Position, to: Position): Position {
    return { x: to.x - from.x, y: to.y - from.y };
}

export class Knot {
    point: Point = new Point();

    getPosition(): Position {
        return this.point.position;
    }

    moveInDirection(direction: Direction): void {
        this.point.moveInDirection(direction);
    }

    getDistanceTo(other: Point): number {
        return getDistanceBetweenPoints(this.point, other);
    }

    getPositionDelta(other: Knot): Position {
        return this.point.getPositionDelta(other.point);
    }

    isUnder(other: Knot): boolean {
        const { y } = this.getPositionDelta(other);
        return y >= 2;
    }

    isAbove(other: Knot): boolean {
        const { y } = this.getPositionDelta(other);
        return y <= -2;
    }

    isLeftTo(other: Knot): boolean {
        const { x } = this.getPositionDelta(other);
        return x >= 2;
    }

    isRightTo(other: Knot): boolean {
        const { x } = this.getPositionDelta(other);
        return x <= -2;
    }

    isDownLeftTo(other: Knot): boolean {
        const { x, y } = this.getPositionDelta(other);
        return (x >= 1 && y >= 2) || (x >= 2 && y >= 1);
    }

    isDownRightTo(other: Knot): boolean {
        const { x, y } = this.getPositionDelta(other);
        return (x <= -1 && y >= 2) || (x <= -2 && y >= 1);
    }

    isUpLeftTo(other: Knot): boolean {
        const { x, y } = this.getPositionDelta(other);
        return (x >= 1 && y <= -2) || (x >= 2 && y <= -1);
    }

    isUpRightTo(other: Knot): boolean {
        const { x, y } = this.getPositionDelta(other);
        return (x <= -1 && y <= -2) || (x <= -2 && y <= -1);
    }

    follow(knot: Knot): void {
        if (this.isUpLeftTo(knot)) {
            this.point.moveDownRight();
        } else if (this.isUpRightTo(knot)) {
            this.point.moveDownLeft();
        } else if (this.isDownLeftTo(knot)) {
            this.point.moveUpRight();
        } else if (this.isDownRightTo(knot)) {
            this.point.moveUpLeft();
        } else if (this.isAbove(knot)) {
            this.point.moveDown();
        } else if (this.isUnder(knot)) {
            this.point.moveUp();
        } else if (this.isLeftTo(knot)) {
            this.point.moveRight();
        } else if (this.isRightTo(knot)) {
            this.point.moveLeft();
        }
    }
}

export function copyPosition(position: Position): Position {
    return { x: position.x, y: position.y };
}

export function arePositionsEqual(
    position: Position,
    other: Position
): boolean {
    return position.x === other.x && position.y === other.y;
}

export function isInPositions(
    positions: Position[],
    position: Position
): boolean {
    return positions.some(p => arePositionsEqual(p, position));
}

export function getUniquePositions(positions: Position[]): Position[] {
    const uniquePositions: Position[] = [];
    positions.forEach(position => {
        if (!isInPositions(uniquePositions, position)) {
            uniquePositions.push(position);
        }
    });
    return uniquePositions;
}

export interface Move {
    direction: Direction;
    distance: number;
}

export function parseMove(move: string): Move {
    const [direction, distance] = move.split(` `) as [Direction, string];
    return {
        direction: direction,
        distance: +distance,
    };
}

export class Grid {
    knots: Knot[];
    head: Knot;
    tail: Knot;
    tails: Knot[];
    tailPositionsHistory: Position[] = [];

    constructor(numberOfKnots: number) {
        this.knots = new Array(numberOfKnots).fill(0).map(() => new Knot());
        this.head = this.knots[0];
        this.tail = this.knots[this.knots.length - 1];
        this.tails = this.knots.slice(1);
        this.tailPositionsHistory.push(copyPosition(this.tail.getPosition()));
    }

    readLine(line: string): void {
        const { direction, distance } = parseMove(line);
        for (let i = 0; i < distance; i++) {
            this.head.moveInDirection(direction);
            this.tails.forEach((knot, i) => knot.follow(this.knots[i]));
            this.tailPositionsHistory.push(
                copyPosition(this.tail.getPosition())
            );
        }
    }

    readLines(lines: string[]): void {
        lines.forEach(line => this.readLine(line));
    }

    print(): void {
        this.tailPositionsHistory.forEach(position => {
            console.log(`(${position.x}, ${position.y})`);
        });
    }
}

export function getNumberOfVisitedCellsFromInputForPartOne(
    input: string
): number {
    const grid = new Grid(2);
    const lines = getLines(input);
    grid.readLines(lines);
    return getUniquePositions(grid.tailPositionsHistory).length;
}

export function getNumberOfVisitedCellsFromInputForPartTwo(
    input: string
): number {
    const grid = new Grid(10);
    const lines = getLines(input);
    grid.readLines(lines);
    return getUniquePositions(grid.tailPositionsHistory).length;
}

export function computeOutput(input: string): string {
    const points = getNumberOfVisitedCellsFromInputForPartTwo(input);
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
