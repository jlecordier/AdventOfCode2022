import { readFile, writeFile } from 'node:fs/promises';

export interface Node {
    type: `file` | `directory`;
    name: string;
    parent: Directory | null;
    getSize(): number;
    getPath(): string;
}

export interface IFile extends Node {
    type: `file`;
}

export interface IDirectory extends Node {
    type: `directory`;
}

export class Directory implements IDirectory {
    type: `directory` = `directory`;
    name: string;
    parent: Directory | null = null;
    children: (Node | Directory)[] = [];

    constructor(name: string, parent: Directory | null = null) {
        this.name = name;
        this.parent = parent;
        if (this.parent) {
            this.parent.addNode(this);
        }
    }

    addNode(node: Node): void {
        this.children.push(node);
    }

    getNode(name: string): Node | undefined {
        return this.children.find(child => child.name === name);
    }
    getDirectory(name: string): Directory {
        return this.children.find(
            (child): child is Directory =>
                child.name === name && child.type === `directory`
        )!;
    }

    getSize(): number {
        return this.children.reduce((sum, child) => sum + child.getSize(), 0);
    }

    getPath(): string {
        if (!this.parent) {
            return this.name;
        }
        return `${this.parent.getPath()}${this.name}/`;
    }
}

export class File implements IFile {
    type: `file` = `file`;
    name: string;
    parent: Directory;
    size: number;

    constructor(name: string, size: number, directory: Directory) {
        this.name = name;
        this.size = size;
        this.parent = directory;
    }

    getSize(): number {
        return this.size;
    }

    getPath(): string {
        return `${this.parent.getPath()}/${this.name}`;
    }
}

export class Explorer {
    root: Directory = new Directory(`/`);
    directories: Directory[] = [];
    currentDirectory: Directory = this.root;

    constructor() {
        this.addDirectory(this.root);
    }

    addDirectory(directory: Directory): void {
        this.directories.push(directory);
    }

    goToParentDirectory(): void {
        this.currentDirectory = this.currentDirectory.parent!;
    }

    toToRootDirectory() {
        this.currentDirectory = this.root;
    }

    cd(path: string): void {
        if (path === `..`) {
            this.goToParentDirectory();
        } else if (path === `/`) {
            this.toToRootDirectory();
        } else {
            let directory = this.currentDirectory.getDirectory(path);
            if (!directory) {
                directory = new Directory(path, this.currentDirectory);
            }
            this.currentDirectory = directory;
        }
    }

    parseCD(line: string): void {
        const [$, cd, path] = line.split(` `);
        this.cd(path);
    }

    parseDirectory(node: string): void {
        const [dir, name] = node.split(` `);
        const existingDirectory = this.currentDirectory.getDirectory(name);
        if (existingDirectory) {
            return;
        }
        this.addDirectory(new Directory(name, this.currentDirectory));
    }

    parseFile(node: string): void {
        const [size, name] = node.split(` `);
        const existingFile = this.currentDirectory.getNode(name);
        if (existingFile) {
            return;
        }
        this.currentDirectory.addNode(
            new File(name, +size, this.currentDirectory)
        );
    }

    parseNode(node: string): void {
        if (node.startsWith(`dir`)) {
            this.parseDirectory(node);
        } else {
            this.parseFile(node);
        }
    }

    readLine(line: string): void {
        if (line.startsWith(`$ cd`)) {
            this.parseCD(line);
        } else if (line.startsWith(`$ ls`)) {
            return;
        } else {
            this.parseNode(line);
        }
    }

    readLines(lines: string[]): void {
        lines.forEach(line => this.readLine(line));
    }

    getUsedSpace(): number {
        return this.root.getSize();
    }
}

export function getLines(input: string): string[] {
    return input.split('\n');
}

export function sum(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

export function getSumOfSmallDirectoriesFromInput(input: string): number {
    const lines = getLines(input);
    const explorer = new Explorer();
    explorer.readLines(lines);
    const sizes = explorer.directories.map(directory => directory.getSize());
    const smallSizes = sizes.filter(size => size <= 100000);
    return sum(smallSizes);
}

export function getSmallestDirectoryToDeleteFromInput(input: string): number {
    const lines = getLines(input);
    const explorer = new Explorer();
    explorer.readLines(lines);
    const sizes = explorer.directories.map(directory => directory.getSize());
    const orderedSizes = [...sizes].sort((a, b) => a - b);
    const usedSpace = explorer.getUsedSpace();
    const TOTAL_SPACE = 70000000;
    const REQUIRED_SPACE = 30000000;
    const smallest = orderedSizes.find(
        size => TOTAL_SPACE - (usedSpace - size) >= REQUIRED_SPACE
    )!;
    return smallest;
}

export function computeOutput(input: string): string {
    const points = getSmallestDirectoryToDeleteFromInput(input);
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
