export type DebugNode<T> = {
    color: 'red' | 'black';
    parent: T | null;
    childLeft: T | null;
    childRight: T | null;
    note: string;
}

class SortNode<T> {
    private _content: T;
    private _smaller: SortNode<T> | null;
    private _larger: SortNode<T> | null;
    private _parent: SortNode<T> | null;
    private _isRed: boolean;
    private _note: string;

    constructor(content: T) {
        this._content = content;
        this._smaller = null;
        this._larger = null;
        this._parent = null;
        this._isRed = true;
        this._note = '';
    }

    insertSmaller(newNode: SortNode<T>) {
        let parent: SortNode<T> = this;
        if (parent._smaller === null) {
            parent._smaller = newNode;
            newNode._parent = parent;
            newNode.fixInsertion();
            return;
        } else {
            parent = parent._smaller;
        }
        while (parent._larger !== null) {
            parent = parent._larger;
        }
        parent._larger = newNode;
        newNode._parent = parent;

        newNode.fixInsertion();
    }

    insertLarger(newNode: SortNode<T>) {
        let parent: SortNode<T> = this;
        if (parent._larger === null) {
            parent._larger = newNode;
            newNode._parent = parent;
            newNode.fixInsertion();
            return;
        } else {
            parent = parent._larger;
        }
        while (parent._smaller !== null) {
            parent = parent._smaller;
        }
        parent._smaller = newNode;
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

            if (grandparent._smaller === parent) {
                const auncle = grandparent._larger;
                if (auncle !== null && auncle._isRed) {
                    node._note += "L1";
                    parent._isRed = false;
                    auncle._isRed = false;
                    grandparent._isRed = true;
                    node = grandparent;
                } else if (node === parent._larger) {
                    node._note += "L2"
                    parent.leftRotate();
                    grandparent.rightRotate();
                    grandparent._isRed = true;
                    node._isRed = false;
                } else {
                    node._note += "L3"
                    parent._isRed = false;
                    grandparent._isRed = true;
                    grandparent.rightRotate();
                }
            } else {
                const auncle = grandparent._smaller;
                if (auncle !== null && auncle._isRed) {
                    node._note += "R1";
                    parent._isRed = false;
                    auncle._isRed = false;
                    grandparent._isRed = true;

                    node = grandparent;
                } else if (node === parent._smaller) {
                    node._note += "R2"
                    parent.rightRotate();
                    grandparent.leftRotate();
                    grandparent._isRed = true;
                    node._isRed = false;
                } else {
                    node._note += "R3";
                    parent._isRed = false;
                    grandparent._isRed = true;
                    grandparent.leftRotate();

                }
            }
        }
    }

    leftRotate() {
        if (this._larger === null) {
            throw `Cannot perform left rotation on ${this._content} as its larger child is null`;
        }

        const originalParent = this._parent;
        const originalLarger = this._larger;
        const originalGrandchild = this._larger._smaller;

        originalLarger._parent = originalParent;
        if (originalParent !== null) {
            if (originalParent._smaller === this) {
                originalParent._smaller = originalLarger;
            } else {
                originalParent._larger = originalLarger;
            }
        }

        this._parent = originalLarger;
        originalLarger._smaller = this;

        this._larger = originalGrandchild;
        if (originalGrandchild != null) {
            originalGrandchild._parent = this;
        }
    }

    rightRotate() {
        if (this._smaller === null) {
            throw `Cannot perform left rotation on ${this._content} as its larger child is null`;
        }

        const originalParent = this._parent;
        const originalSmaller = this._smaller;
        const originalGrandchild = this._smaller._larger;

        originalSmaller._parent = originalParent;
        if (originalParent !== null) {
            if (originalParent._smaller === this) {
                originalParent._smaller = originalSmaller;
            } else {
                originalParent._larger = originalSmaller;
            }
        }

        this._parent = originalSmaller;
        originalSmaller._larger = this;

        this._smaller = originalGrandchild;
        if (originalGrandchild != null) {
            originalGrandchild._parent = this;
        }
    }

    updateHead(): SortNode<T> {
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
        const childLeft = this._smaller === null ? null : this._smaller._content;
        const childRight = this._larger === null ? null : this._larger._content;

        return {
            color,
            parent,
            childLeft,
            childRight,
            note: this._note,
        };
    }

    get content() {
        return this._content;
    }

    get smaller() {
        return this._smaller;
    }

    get larger() {
        return this._larger;
    }

    get parent() {
        return this._parent;
    }
}


export class SortTree<T> {
    private _head: SortNode<T> | null;
    private _largest: SortNode<T> | null;
    private _nodeMap: Map<T, SortNode<T>>;

    constructor() {
        this._head = null;
        this._largest = null;
        this._nodeMap = new Map;
    }

    insertLargest(item: T) {
        if (this._head === null) {
            const newNode = new SortNode(item);
            this._head = newNode;
            this._largest = newNode;
            this._head = this._head.updateHead();
            this._nodeMap.set(item, newNode);
        } else {
            const newLargest = new SortNode(item);
            this._largest?.insertLarger(newLargest);
            this._largest = newLargest;
            this._nodeMap.set(item, newLargest);
            this._head = this._head.updateHead();
        }
    }

    insert(item: T, comparitor: string, compared: T) {
        if (this._head === null) {
            const newNode = new SortNode(item);
            this._head = newNode;
            this._largest = newNode;
            this._head = this._head.updateHead();
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
            this._head = this._head.updateHead();
            this._nodeMap.set(item, newNode);
        } else if (comparitor == "larger") {
            const newNode = new SortNode(item);
            reference.insertLarger(newNode)
            this._head = this._head.updateHead();
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
        let currentNode = this._head;
        while (nodeStack.length != 0 || currentNode !== null) {
            if (currentNode !== null) {
                nodeStack.push(currentNode);
                currentNode = currentNode.smaller;
            } else {
                currentNode = nodeStack.pop() ?? null;
                if (currentNode === null) {
                    throw "Internal error during walk.  This should never be reached";
                } else {
                    orderMap.set(currentNode.content, index);
                    index += 1;
                }
                currentNode = currentNode.larger;
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

        if (aCurrent === undefined) {
            throw `There is no node with the name ${a}.  Unable to search.`;
        }

        if (bCurrent === undefined) {
            throw `There is no node with the name ${b}.  Unable to search.`;
        }

        while(aCurrent !== this._head || bCurrent !== this._head) {
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
                if (aNext.smaller === aCurrent) {
                    return -1;
                } else {
                    return 1;
                }
            }

            if (aVisited.has(bNext.content)) {
                if (bNext.smaller === bCurrent) {
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

    createDebug(): Map<T, DebugNode<T>> {
        const debugMap = new Map<T, DebugNode<T>>;
        const nodeStack = [];
        let currentNode = this._head;
        while (nodeStack.length != 0 || currentNode !== null) {
            if (currentNode !== null) {
                nodeStack.push(currentNode);
                currentNode = currentNode.smaller;
            } else {
                currentNode = nodeStack.pop() ?? null;
                if (currentNode === null) {
                    throw "Internal error during walk.  This should never be reached";
                } else {
                    debugMap.set(currentNode.content, currentNode.createDebugNode());
                }
                currentNode = currentNode.larger;
            }
        }

        return debugMap;
    }
}