import { describe, expect, it, beforeEach } from 'vitest';
import { SortTree } from '$lib/sort_tree';

describe("Successive insertLargest calls provide the correct order", () => {
    it("Insert in increasing alphabetical order", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('a');
        letterTree.insertLargest('b');
        letterTree.insertLargest('c');
        letterTree.insertLargest('d');
        letterTree.insertLargest('e');
        letterTree.insertLargest('f');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['b', 1],
            ['c', 2],
            ['d', 3],
            ['e', 4],
            ['f', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })

    it("Insert random letters", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('g');
        letterTree.insertLargest('w');
        letterTree.insertLargest('c');
        letterTree.insertLargest('i');
        letterTree.insertLargest('z');
        letterTree.insertLargest('y');

        const expectedMap = new Map<string, number>([
            ['g', 0],
            ['w', 1],
            ['c', 2],
            ['i', 3],
            ['z', 4],
            ['y', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })
})

describe("Inserting data into the tree with insert produces expected key/value table", () => {
    it("Insert Data in increasing order", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('a');
        letterTree.insert('b', 'larger', 'a');
        letterTree.insert('c', 'larger', 'b');
        letterTree.insert('d', 'larger', 'c');
        letterTree.insert('e', 'larger', 'd');
        letterTree.insert('f', 'larger', 'e');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['b', 1],
            ['c', 2],
            ['d', 3],
            ['e', 4],
            ['f', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })

    it("Insert Data in decreasing order", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('f');
        letterTree.insert('e', 'smaller', 'f');
        letterTree.insert('d', 'smaller', 'e');
        letterTree.insert('c', 'smaller', 'd');
        letterTree.insert('b', 'smaller', 'c');
        letterTree.insert('a', 'smaller', 'b');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['b', 1],
            ['c', 2],
            ['d', 3],
            ['e', 4],
            ['f', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })

    it("Insert Data in a random order but ordered like the alphabet", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('c');
        letterTree.insert('d', 'larger', 'c');
        letterTree.insert('b', 'smaller', 'c');
        letterTree.insert('a', 'smaller', 'b');
        letterTree.insert('f', 'larger', 'd');
        letterTree.insert('e', 'larger', 'd');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['b', 1],
            ['c', 2],
            ['d', 3],
            ['e', 4],
            ['f', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })

    it("Insert data in same order but different command", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('c');
        letterTree.insert('d', 'larger', 'c');
        letterTree.insert('b', 'smaller', 'c');
        letterTree.insert('a', 'smaller', 'b');
        letterTree.insert('f', 'larger', 'd');
        letterTree.insert('e', 'smaller', 'f');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['b', 1],
            ['c', 2],
            ['d', 3],
            ['e', 4],
            ['f', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })

    it("Insert data alphabetically but design so all vowels are first", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('a');
        letterTree.insert('b', 'larger', 'a');
        letterTree.insert('c', 'larger', 'b');
        letterTree.insert('d', 'larger', 'c');
        letterTree.insert('e', 'larger', 'a');
        letterTree.insert('f', 'larger', 'd');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['e', 1],
            ['b', 2],
            ['c', 3],
            ['d', 4],
            ['f', 5],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })

    it("Insert with alphabetical order but jumping around letters a lot", () => {
        const letterTree = new SortTree();
        letterTree.insertLargest('g');
        letterTree.insert('c', 'smaller', 'g');
        letterTree.insert('d', 'smaller', 'g');
        letterTree.insert('k', 'larger', 'g');
        letterTree.insert('e', 'larger', 'd');
        letterTree.insert('f', 'smaller', 'g');
        letterTree.insert('i', 'larger', 'g');
        letterTree.insert('h', 'larger', 'g');
        letterTree.insert('a', 'smaller', 'c');
        letterTree.insert('j', 'larger', 'i');
        letterTree.insert('b', 'larger', 'a');

        const expectedMap = new Map<string, number>([
            ['a', 0],
            ['b', 1],
            ['c', 2],
            ['d', 3],
            ['e', 4],
            ['f', 5],
            ['g', 6],
            ['h', 7],
            ['i', 8],
            ['j', 9],
            ['k', 10],
        ]);

        expect(letterTree.createOrderMap()).toStrictEqual(expectedMap);
    })
})

describe("Comparing two members gives expected results", () => {
    interface LocalTestContext {
        preSorted: SortTree<string>;
    }

    beforeEach<LocalTestContext>(async (context) => {
        const preSorted = new SortTree<string>();
        preSorted.insertLargest('g');
        preSorted.insert('c', 'smaller', 'g');
        preSorted.insert('d', 'smaller', 'g');
        preSorted.insert('i', 'larger', 'g');
        preSorted.insert('e', 'larger', 'd');
        preSorted.insert('f', 'smaller', 'g');
        preSorted.insert('k', 'larger', 'g');
        preSorted.insert('h', 'larger', 'k');
        preSorted.insert('a', 'smaller', 'c');
        preSorted.insert('j', 'smaller', 'i');
        preSorted.insert('b', 'larger', 'a');

        context.preSorted = preSorted;
    })

    it<LocalTestContext>("Compare a and b", ({ preSorted }) => {
        expect(preSorted.compare('a', 'b')).toBe(-1);
    })

    it<LocalTestContext>("Compare b and e", ({ preSorted }) => {
        expect(preSorted.compare('b', 'e')).toBe(-1);
    })

    it<LocalTestContext>("Compare d and c", ({ preSorted }) => {
        expect(preSorted.compare('d', 'c')).toBe(1);
    })

    it<LocalTestContext>("Compare b and g", ({ preSorted }) => {
        expect(preSorted.compare('b', 'g')).toBe(-1);
    })

    it<LocalTestContext>("Compare b and a", ({ preSorted }) => {
        expect(preSorted.compare('b', 'a')).toBe(1);
    })

    it<LocalTestContext>("Compare i and i", ({ preSorted }) => {
        expect(preSorted.compare('i', 'i')).toBe(0);
    })
    
    it<LocalTestContext>("Compare g and g", ({ preSorted }) => {
        expect(preSorted.compare('g', 'g')).toBe(0);
    })

    it<LocalTestContext>("Compare k and a", ({ preSorted }) => {
        expect(preSorted.compare('k', 'a')).toBe(1);
    })
    it<LocalTestContext>("Compare g and a", ({ preSorted }) => {
        expect(preSorted.compare('g', 'a')).toBe(1);
    })
})