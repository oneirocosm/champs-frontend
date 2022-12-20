export type DebugNode<T> = {
    color: 'red' | 'black';
    parent: T | null;
    childLeft: T | null;
    childRight: T | null;
}

class SortNode<T> {
    private _content: T;
    private _childLeft: SortNode<T> | null;
    private _childRight: SortNode<T> | null;
    private _parent: SortNode<T> | null;
    private _isRed: boolean;

    constructor(content: T) {
        this._content = content;
        this._childLeft = null;
        this._childRight = null;
        this._parent = null;
        this._isRed = true;
    }

    insertSmaller(newNode: SortNode<T>) {
        let parent: SortNode<T> = this;
        if (parent._childLeft === null) {
            parent._childLeft = newNode;
            newNode._parent = parent;
            newNode.fixInsertion();
            return;
        } else {
            parent = parent._childLeft;
        }
        while (parent._childRight !== null) {
            parent = parent._childRight;
        }
        parent._childRight = newNode;
        newNode._parent = parent;

        newNode.fixInsertion();
    }

    insertLarger(newNode: SortNode<T>) {
        let parent: SortNode<T> = this;
        if (parent._childRight === null) {
            parent._childRight = newNode;
            newNode._parent = parent;
            newNode.fixInsertion();
            return;
        } else {
            parent = parent._childRight;
        }
        while (parent._childLeft !== null) {
            parent = parent._childLeft;
        }
        parent._childLeft = newNode;
        newNode._parent = parent;

        newNode.fixInsertion();
    }

    private fixInsertion() {
        let node: SortNode<T> = this;
        node._isRed = true;

        while (node._parent !== null && node._parent._isRed) {
            // if you are this far, the parent is red
            const parent = node._parent;
            const grandparent = parent._parent;
            if (grandparent === null) {
                throw `It should be impossible for ${parent._content} to be root and red`;
            }

            if (grandparent._childLeft === parent) {
                const auncle = grandparent._childRight;
                if (auncle !== null && auncle._isRed) {
                    parent._isRed = false;
                    auncle._isRed = false;
                    grandparent._isRed = true;
                    node = grandparent;
                } else if (node === parent._childRight) {
                    parent.leftRotate();
                    grandparent._isRed = true;
                    node._isRed = false;
                    grandparent.rightRotate();
                    node = parent;
                } else {
                    parent._isRed = false;
                    grandparent._isRed = true;
                    grandparent.rightRotate();
                }
            } else {
                const auncle = grandparent._childLeft;
                if (auncle !== null && auncle._isRed) {
                    parent._isRed = false;
                    auncle._isRed = false;
                    grandparent._isRed = true;

                    node = grandparent;
                } else if (node === parent._childLeft) {
                    parent.rightRotate();
                    grandparent._isRed = true;
                    node._isRed = false;
                    grandparent.leftRotate();
                    node = parent;
                } else {
                    parent._isRed = false;
                    grandparent._isRed = true;
                    grandparent.leftRotate();
                }
            }
        }
    }

    leftRotate() {
        if (this._childRight === null) {
            throw `Cannot perform left rotation on ${this._content} as its larger child is null`;
        }

        const originalParent = this._parent;
        const originalLarger = this._childRight;
        const originalGrandchild = this._childRight._childLeft;

        originalLarger._parent = originalParent;
        if (originalParent !== null) {
            if (originalParent._childLeft === this) {
                originalParent._childLeft = originalLarger;
            } else {
                originalParent._childRight = originalLarger;
            }
        }

        this._parent = originalLarger;
        originalLarger._childLeft = this;

        this._childRight = originalGrandchild;
        if (originalGrandchild != null) {
            originalGrandchild._parent = this;
        }
    }

    rightRotate() {
        if (this._childLeft === null) {
            throw `Cannot perform left rotation on ${this._content} as its larger child is null`;
        }

        const originalParent = this._parent;
        const originalSmaller = this._childLeft;
        const originalGrandchild = this._childLeft._childRight;

        originalSmaller._parent = originalParent;
        if (originalParent !== null) {
            if (originalParent._childLeft === this) {
                originalParent._childLeft = originalSmaller;
            } else {
                originalParent._childRight = originalSmaller;
            }
        }

        this._parent = originalSmaller;
        originalSmaller._childRight = this;

        this._childLeft = originalGrandchild;
        if (originalGrandchild != null) {
            originalGrandchild._parent = this;
        }
    }

    updateRoot(): SortNode<T> {
        let node: SortNode<T> = this;
        while (node.parent != null) {
            node = node.parent;
        }
        node._isRed = false;
        return node;
    }

    createDebugNode(): DebugNode<T> {
        const color = this._isRed ? 'red' : 'black';
        const parent = this._parent === null ? null : this._parent._content;
        const childLeft = this._childLeft === null ? null : this._childLeft._content;
        const childRight = this._childRight === null ? null : this._childRight._content;

        return {
            color,
            parent,
            childLeft,
            childRight,
        };
    }

    get content() {
        return this._content;
    }

    get childLeft() {
        return this._childLeft;
    }

    get childRight() {
        return this._childRight;
    }

    get parent() {
        return this._parent;
    }
}


export class SortTree<T> {
    private _root: SortNode<T> | null;
    private _largest: SortNode<T> | null;
    private _nodeMap: Map<T, SortNode<T>>;

    constructor() {
        this._root = null;
        this._largest = null;
        this._nodeMap = new Map;
    }

    insertLargest(item: T) {
        if (this._root === null) {
            const newNode = new SortNode(item);
            this._root = newNode;
            this._largest = newNode;
            this._root = this._root.updateRoot();
            this._nodeMap.set(item, newNode);
        } else {
            const newLargest = new SortNode(item);
            this._largest?.insertLarger(newLargest);
            this._largest = newLargest;
            this._nodeMap.set(item, newLargest);
            this._root = this._root.updateRoot();
        }
    }

    insert(item: T, comparitor: string, compared: T) {
        if (this._root === null) {
            const newNode = new SortNode(item);
            this._root = newNode;
            this._largest = newNode;
            this._root = this._root.updateRoot();
            this._nodeMap.set(item, newNode);
            return;
        }

        const reference = this._nodeMap.get(compared);
        if (reference === undefined) {
            throw `Node ${compared} does not seem to exist within this SortTree`;
        }
        if (comparitor == "smaller") {
            const newNode = new SortNode(item);
            reference.insertSmaller(newNode)
            this._root = this._root.updateRoot();
            this._nodeMap.set(item, newNode);
        } else if (comparitor == "larger") {
            const newNode = new SortNode(item);
            reference.insertLarger(newNode)
            this._root = this._root.updateRoot();
            this._nodeMap.set(item, newNode);
            if (reference === this._largest) {
                this._largest = newNode;
            }
        } else {
            throw `Comparitor ${comparitor} is invalid.  It must be 'smaller' or 'larger'. No SortNode created.`;
        }
    }

    createOrderMap(): Map<T, number> {
        let index = 0;
        const orderMap = new Map<T, number>;
        const nodeStack = [];
        let currentNode = this._root;
        while (nodeStack.length != 0 || currentNode !== null) {
            if (currentNode !== null) {
                nodeStack.push(currentNode);
                currentNode = currentNode.childLeft;
            } else {
                currentNode = nodeStack.pop() ?? null;
                if (currentNode === null) {
                    throw "Internal error during walk.  This should never be reached";
                }
                orderMap.set(currentNode.content, index);
                index += 1;
                currentNode = currentNode.childRight;
            }
        }

        return orderMap;
    }

    compare(a: T, b: T): number {
        if (a === b) {
            return 0;
        }
        const aVisited: Set<T> = new Set();
        aVisited.add(a);
        const bVisited: Set<T> = new Set();
        bVisited.add(b);
        
        let aCurrent = this._nodeMap.get(a);
        let bCurrent = this._nodeMap.get(b);

        if (aCurrent === undefined && bCurrent !== undefined) {
            // a does not exist but b does, so b is smaller
            return 1;
        } else if (aCurrent !== undefined && bCurrent === undefined) {
            // b does not exist but a does, so a is smaller
            return -1;
        } else if (aCurrent === undefined && bCurrent === undefined) {
            // neither exists, so they are the same size
            return 0;
        }

        while(aCurrent !== this._root || bCurrent !== this._root) {
            let aNext: SortNode<T> | null = aCurrent.parent;
            let bNext: SortNode<T> | null = bCurrent.parent;
            if (aNext !== null) {
                aVisited.add(aNext.content);
            } else {
                aNext = aCurrent;
            }
            if (bNext !== null) {
                bVisited.add(bNext.content);
            } else {
                bNext = bCurrent;
            }

            if (bVisited.has(aNext.content)) {
                if (aNext.childLeft === aCurrent) {
                    return -1;
                } else {
                    return 1;
                }
            }

            if (aVisited.has(bNext.content)) {
                if (bNext.childLeft === bCurrent) {
                    return 1;
                } else {
                    return -1;
                }
            }
            aCurrent = aNext;
            bCurrent = bNext;
        }
        throw "Unable to reach shared parent before head.  Tree is improperly formatted";
    }

    min(a: T, b: T): T {
        const comparison = this.compare(a, b);
        if (comparison === 1) {
            return b;
        } else {
            return a;
        }
    }

    createDebug(): Map<T, DebugNode<T>> {
        const debugMap = new Map<T, DebugNode<T>>;
        const nodeStack = [];
        let currentNode = this._root;
        while (nodeStack.length != 0 || currentNode !== null) {
            if (currentNode !== null) {
                nodeStack.push(currentNode);
                currentNode = currentNode.childLeft;
            } else {
                currentNode = nodeStack.pop() ?? null;
                if (currentNode === null) {
                    throw "Internal error during walk.  This should never be reached";
                } else {
                    debugMap.set(currentNode.content, currentNode.createDebugNode());
                }
                currentNode = currentNode.childRight;
            }
        }

        return debugMap;
    }

    get root() {
        return this._root;
    }
}