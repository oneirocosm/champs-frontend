import { describe, expect, it, beforeEach } from 'vitest';
import { SortTree } from '$lib/sort_tree';
import * as fc from 'fast-check';

import type { DebugNode } from '$lib/sort_tree';

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

describe("Test red/black tree insertions rotate and color correctly", () => {
    it("Test inserted head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);

        const expectedMap = new Map<number, DebugNode<number>>([
            [15, {
                color: 'black',
                parent: null,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test left link to head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);
        numberTree.insert(5, 'smaller', 15);

        const expectedMap = new Map<number, DebugNode<number>>([
            [15, {
                color: 'black',
                parent: null,
                childLeft: 5,
                childRight: null,
            }],
            [5, {
                color: 'red',
                parent: 15,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test right link to head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);
        numberTree.insert(2, 'larger', 15);

        const expectedMap = new Map<number, DebugNode<number>>([
            [15, {
                color: 'black',
                parent: null,
                childLeft: null,
                childRight: 2,
            }],
            [2, {
                color: 'red',
                parent: 15,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test left link to left link to head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);
        numberTree.insert(5, 'smaller', 15);
        numberTree.insert(1, 'smaller', 5);

        const expectedMap = new Map<number, DebugNode<number>>([
            [5, {
                color: 'black',
                parent: null,
                childLeft: 1,
                childRight: 15,
            }],
            [1, {
                color: 'red',
                parent: 5,
                childLeft: null,
                childRight: null,
            }],
            [15, {
                color: 'red',
                parent: 5,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test right link to right link to head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);
        numberTree.insert(20, 'larger', 15);
        numberTree.insert(22, 'larger', 20);

        const expectedMap = new Map<number, DebugNode<number>>([
            [15, {
                color: 'red',
                parent: 20,
                childLeft: null,
                childRight: null,
            }],
            [20, {
                color: 'black',
                parent: null,
                childLeft: 15,
                childRight: 22,
            }],
            [22, {
                color: 'red',
                parent: 20,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test right link to left link to head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);
        numberTree.insert(5, 'smaller', 15);
        numberTree.insert(7, 'larger', 5);

        const expectedMap = new Map<number, DebugNode<number>>([
            [5, {
                color: 'red',
                parent: 7,
                childLeft: null,
                childRight: null,
            }],
            [7, {
                color: 'black',
                parent: null,
                childLeft: 5,
                childRight: 15,
            }],
            [15, {
                color: 'red',
                parent: 7,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test left link to right link to head", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(15);
        numberTree.insert(20, 'larger', 15);
        numberTree.insert(16, 'larger', 15);

        const expectedMap = new Map<number, DebugNode<number>>([
            [15, {
                color: 'red',
                parent: 16,
                childLeft: null,
                childRight: null,
            }],
            [16, {
                color: 'black',
                parent: null,
                childLeft: 15,
                childRight: 20,
            }],
            [20, {
                color: 'red',
                parent: 16,
                childLeft: null,
                childRight: null,
            }],
        ]);
        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test insertions that change color", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(11);
        numberTree.insert(2, 'smaller', 11);
        numberTree.insert(14, 'larger', 11);
        numberTree.insert(1, 'smaller', 2);
        numberTree.insert(7, 'smaller', 11);
        numberTree.insert(5, 'smaller', 7);
        numberTree.insert(8, 'larger', 7);
        numberTree.insert(15, 'larger', 14);

        const expectedMap = new Map<number, DebugNode<number>>([
            [1, {
                color: 'black',
                parent: 2,
                childLeft: null,
                childRight: null,
            }],
            [2, {
                color: 'red',
                parent: 11,
                childLeft: 1,
                childRight: 7,
            }],
            [5, {
                color: 'red',
                parent: 7,
                childLeft: null,
                childRight: null,
            }],
            [7, {
                color: 'black',
                parent: 2,
                childLeft: 5,
                childRight: 8,
            }],
            [8, {
                color: 'red',
                parent: 7,
                childLeft: null,
                childRight: null,
            }],
            [11, {
                color: 'black',
                parent: null,
                childLeft: 2,
                childRight: 14,
            }],
            [14, {
                color: 'black',
                parent: 11,
                childLeft: null,
                childRight: 15,
            }],
            [15, {
                color: 'red',
                parent: 14,
                childLeft: null,
                childRight: null,
            }],
        ]);

        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })

    it("Test insertion with multiple rotations", () => {
        const numberTree = new SortTree<number>();
        numberTree.insertLargest(11);
        numberTree.insert(2, 'smaller', 11);
        numberTree.insert(14, 'larger', 11);
        numberTree.insert(1, 'smaller', 2);
        numberTree.insert(7, 'smaller', 11);
        numberTree.insert(5, 'smaller', 7);
        numberTree.insert(8, 'larger', 7);
        numberTree.insert(15, 'larger', 14);
        numberTree.insert(4, 'smaller', 5);

        const expectedMap = new Map<number, DebugNode<number>>([
            [1, {
                color: 'black',
                parent: 2,
                childLeft: null,
                childRight: null,
            }],
            [2, {
                color: 'red',
                parent: 7,
                childLeft: 1,
                childRight: 5,
            }],
            [4, {
                color: 'red',
                parent: 5,
                childLeft: null,
                childRight: null,
            }],
            [5, {
                color: 'black',
                parent: 2,
                childLeft: 4,
                childRight: null,
            }],
            [7, {
                color: 'black',
                parent: null,
                childLeft: 2,
                childRight: 11,
            }],
            [8, {
                color: 'black',
                parent: 11,
                childLeft: null,
                childRight: null,
            }],
            [11, {
                color: 'red',
                parent: 7,
                childLeft: 8,
                childRight: 14,
            }],
            [14, {
                color: 'black',
                parent: 11,
                childLeft: null,
                childRight: 15,
            }],
            [15, {
                color: 'red',
                parent: 14,
                childLeft: null,
                childRight: null,
            }],
        ]);

        expect(numberTree.createDebug()).toStrictEqual(expectedMap);
    })
})

describe("Property-tests for red/black tree", () => {
    interface LocalTestContext {
        createTestTree: (() => fc.Arbitrary<SortTree<number>>);
    }

    beforeEach<LocalTestContext>(async (context) => {
        // this must be passed in as a function so it can be
        // run multiple times with different random values
        function createTestTree() {
            const floatBoolTuple = fc.tuple(fc.integer({min: -99, max: 999}), fc.boolean(), fc.integer({min: 0}));
            const select = (a: [number, boolean, number]) => a[0];
            //const floatBoolTupleArray = fc.uniqueArray(floatBoolTuple, {minLength: 200, maxLength: 400, selector: select});
            const floatBoolTupleArray = fc.uniqueArray(floatBoolTuple, {minLength: 10, maxLength: 12, selector: select});
            return floatBoolTupleArray.map((inputData) => {
                    const randomTree = new SortTree<number>;
                    const alreadyUsed = [];
                    let numAdded = 1;
                    const first = inputData[0][0];
                    randomTree.insertLargest(first);
                    alreadyUsed.push(first);
                    for (const tuple of inputData.slice(1)) {
                        const newVal = tuple[0];
                        const sizeSignifier = tuple[1] ? 'larger' : 'smaller';
                        const indexAlreadyUsed = tuple[2] % numAdded;
                        const comparison = alreadyUsed[indexAlreadyUsed];
                        randomTree.insert(newVal, sizeSignifier, comparison);
                        alreadyUsed.push(newVal);
                        numAdded += 1;
                    }
                    return randomTree;
            });
        }

        context.createTestTree = createTestTree;
    })

    it<LocalTestContext>("test root node is always black", ({ createTestTree }) => {
        const testTree = createTestTree();
        fc.assert(
            fc.property(testTree, (testTree) => {
                expect(testTree.root?.createDebugNode().color).toBe('black');
            })
        )
    })

    it<LocalTestContext>("no red node can have a child that is also a red node", ({ createTestTree }) => {
        const testTree = createTestTree();
        fc.assert(
            fc.property(testTree, (testTree) => {
                let currentNode = testTree.root;
                const nodeStack = [];
                console.log(`${JSON.stringify(currentNode?.createDebugNode())}`);

                while (nodeStack.length != 0 || currentNode !== null) {
                    if (currentNode !== null) {
                        nodeStack.push(currentNode);
                        currentNode = currentNode.smaller;
                    } else {
                        currentNode = nodeStack.pop() ?? null;
                        if (currentNode === null) {
                            throw "Internal error during walk.  This should never be reached";
                        }
                        const debugNode = currentNode.createDebugNode();
                        const leftChild = currentNode.smaller;
                        const rightChild = currentNode.larger;
                        if (leftChild !== null) {
                            const leftDebug = leftChild.createDebugNode();
                            expect([debugNode.color, leftDebug.color]).toContain('black');
                        }
                        if (rightChild !== null) {
                            const rightDebug = rightChild.createDebugNode();
                            expect([debugNode.color, rightDebug.color]).toContain('black');
                        }
                        currentNode = currentNode.larger;
                    }
                }
            })
        )
    })

    it<LocalTestContext>("same number of black nodes for every path from root to leaves", ({ createTestTree }) => {
        const testTree = createTestTree();
        fc.assert(
            fc.property(testTree, (testTree) => {
                let currentNode = testTree.root;
                const nodeStack = [];
                const countStack: Array<number> = [];
                const countAtLeaves = new Set();
                console.log(`${JSON.stringify(currentNode?.createDebugNode())}`);

                while (nodeStack.length != 0 || currentNode !== null) {
                    if (currentNode !== null) {
                        nodeStack.push(currentNode);
                        const curVal =  countStack.at(-1) || 0;
                        if (currentNode.createDebugNode().color == 'black') {
                            countStack.push(curVal + 1);
                        } else {
                            countStack.push(curVal);
                        }
                        currentNode = currentNode.smaller;
                    } else {
                        currentNode = nodeStack.pop() ?? null;
                        const curVal = countStack.pop ?? 0;
                        if (currentNode === null) {
                            throw "Internal error during walk.  This should never be reached";
                        }
                        if (currentNode.smaller === null && currentNode.larger === null) {
                            countAtLeaves.add(curVal);
                        }
                        currentNode = currentNode.larger;
                    }
                }
                expect(countAtLeaves).toHaveLength(1);
            })
        )
    })
});