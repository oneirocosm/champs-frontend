import { SortTree } from '$lib/sort_tree';
import type { RoundData, MatchData, MatchEntryData } from '$lib/types';

class BracketNode {
    public content: MatchData;
    public children: Array<BracketNode>;

    constructor(content: MatchData) {
        this.content = content;
        this.children = [];
    }

    minKey(ordering: SortTree<string>) {
        const keys = this.content.match_entry_data.map((item) => item.pokemon_name);
        return keys.reduce((acc: string | undefined, key) => {
            if (acc === undefined) {
                return key;
            } else {
                return ordering.min(acc, key);
            }
        }, undefined);
    }

    minSplit(ordering: SortTree<string>): [Array<MatchEntryData>, MatchEntryData | undefined, Array<MatchEntryData>] {
        const items = this.content.match_entry_data;
        let smallest: MatchEntryData | undefined = undefined;
        let smallestInd: number | undefined = undefined;
        items.forEach((item, index) => {
            if (smallest === undefined) {
                smallest = item;
                smallestInd = index;
            } else if (ordering.compare(smallest.pokemon_name, item.pokemon_name) === 1) {
                smallest = item;
                smallestInd = index;
            }
        });

        if (smallestInd === undefined) {
            return [ [], undefined, [] ];
        }
        const before = items.slice(0, smallestInd);
        const after = items.slice(smallestInd + 1);
        return [before, smallest, after];
    }
}

export class BracketTree {
    private _roots: Array<BracketNode>;
    public ordering: SortTree<string>;

    constructor(rounds: Array<RoundData>) {
        let currRound = new Map<string, BracketNode>;
        let prevRound = new Map<string, BracketNode>;
        this.ordering = new SortTree();
        this._roots = [];

        if (rounds.length == 0) {
            return;
        } else {
            for (const matchData of rounds[0].matches) {
                const newMatchNode = new BracketNode(matchData);
                for (const match_entry_data of matchData.match_entry_data) {
                    prevRound.set(match_entry_data.pokemon_name, newMatchNode);
                    this._roots.push(newMatchNode);
                    this.ordering.insertLargest(match_entry_data.pokemon_name)
                }
            }
        }
        for (const roundData of rounds.slice(1)) {
            for (const matchData of roundData.matches) {
                const newMatchNode = new BracketNode(matchData);

                const [before, smallest, after] = newMatchNode.minSplit(this.ordering);

                if (smallest === undefined) {
                    // handle special case where all entries are new
                    this._roots.push(newMatchNode);
                    for (const item of newMatchNode.content.match_entry_data) {
                        if (!item.is_from_revival) {
                            this.ordering.insertLargest(item.pokemon_name);
                            currRound.set(item.pokemon_name, newMatchNode);
                        }
                    }
                } else {
                    // handle normal case with existing previous round
                    const oldNode = prevRound.get(smallest.pokemon_name);
                    if (oldNode === undefined) {
                        throw `Critical error.  ${smallest.pokemon_name} should exist in previous round`;
                    }
                    oldNode.children.push(newMatchNode);
                    currRound.set(smallest.pokemon_name, newMatchNode);

                    for (const item of before) {
                        if (!item.is_from_revival) {
                            this.ordering.insert(item.pokemon_name, 'smaller', smallest.pokemon_name);
                            currRound.set(item.pokemon_name, newMatchNode);
                        }
                    }
                    for (const item of after.reverse()) {
                        if (!item.is_from_revival) {
                            this.ordering.insert(item.pokemon_name, 'larger', smallest.pokemon_name);
                            currRound.set(item.pokemon_name, newMatchNode);
                        }
                    }
                }
            }
            prevRound = currRound;
            currRound = new Map();
        }
    }

    getPairs(): Array<[MatchData, MatchData]> {
        let currentNode;
        const nodeQueue = [...this._roots];
        const pairs: Array<[MatchData, MatchData]> = [];

        while (nodeQueue.length != 0) {
            currentNode = nodeQueue.shift();

            if (currentNode === undefined) {
                throw `Unreachable hopefully.`
            }

            for (const child of currentNode.children) {
                nodeQueue.push(child);
                pairs.push([currentNode.content, child.content])
            }
        }

        return pairs;
    }
}

/*
export class BracketTree<T, V> {
    roundStarts: Array<BracketNode<T, V>>;

    constructor(lastRound: Array<T>) {
        const convertedRound = lastRound.map((item) => new BracketNode<T,V>(item))
        if (lastRound.length == 0) {
            this.roundStarts = [];
        } else {
            this.roundStarts = convertedRound.slice(0, 1);
            const init = this.roundStarts[0];
            for ()
        }
    }
}
*/