class SortNode<T> {
    private _content: T;
    private _smaller: SortNode<T> | null;
    private _larger: SortNode<T> | null;
    private _parent: SortNode<T> | null;
    private _isRed: boolean;

    constructor(content: T) {
        this._content = content;
        this._smaller = null;
        this._larger = null;
        this._parent = null;
        this._isRed = false;
    }

    insertSmaller(newNode: SortNode<T>) {
        const smallerThanNew = this._smaller;
        newNode._smaller = smallerThanNew;
        this._smaller = newNode;
        newNode._parent = this;
        if (smallerThanNew !== null) {
            smallerThanNew._parent = newNode;
        }
    }

    insertLarger(newNode: SortNode<T>) {
        const largerThanNew = this._larger;
        newNode._larger = largerThanNew;
        this._larger = newNode;
        newNode._parent = this;
        if (largerThanNew !== null) {
            largerThanNew._parent = newNode;
        }
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
            this._nodeMap.set(item, newNode);
        } else {
            const newLargest = new SortNode(item);
            this._largest?.insertLarger(newLargest);
            this._largest = newLargest;
            this._nodeMap.set(item, newLargest);
        }
    }

    insert(item: T, comparitor: string, compared: T) {
        if (this._head === null) {
            const newNode = new SortNode(item);
            this._head = newNode;
            this._largest = newNode;
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
            this._nodeMap.set(item, newNode);
        } else if (comparitor == "larger") {
            const newNode = new SortNode(item);
            reference.insertLarger(newNode)
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
}