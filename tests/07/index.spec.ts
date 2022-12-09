import { describe, expect, it } from 'vitest';
import {
    getLines,
    getSmallestDirectoryToDeleteFromInput,
    getSumOfSmallDirectoriesFromInput,
    sum,
} from './index';

describe(`Day 07`, () => {
    describe(`-- Part One --`, () => {
        it(`shouls get lines`, () => {
            const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
            expect(getLines(input)).toEqual([
                `$ cd /`,
                `$ ls`,
                `dir a`,
                `14848514 b.txt`,
                `8504156 c.dat`,
                `dir d`,
                `$ cd a`,
                `$ ls`,
                `dir e`,
                `29116 f`,
                `2557 g`,
                `62596 h.lst`,
                `$ cd e`,
                `$ ls`,
                `584 i`,
                `$ cd ..`,
                `$ cd ..`,
                `$ cd d`,
                `$ ls`,
                `4060174 j`,
                `8033020 d.log`,
                `5626152 d.ext`,
                `7214296 k`,
            ]);
        });

        it(`should sum`, () => {
            expect(sum([94853, 584])).toEqual(94853 + 584);
        });

        describe(`given a text input`, () => {
            const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
            it(`should get the sum of the small directories`, () => {
                expect(getSumOfSmallDirectoriesFromInput(input)).toEqual(95437);
            });
        });
    });

    describe(`-- Part Two --`, () => {
        describe(`given a text input`, () => {
            const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
            it(`should get the size of the smallest directory big enough to free the required space`, () => {
                expect(getSmallestDirectoryToDeleteFromInput(input)).toEqual(
                    24933642
                );
            });
        });
    });
});
