import type {RoundData, MatchData} from '$lib/types';
type EntryOrd  = Map<String, number>;


export function sortMatchesWithin(rounds: Array<RoundData>): Array<RoundData> {
    let entryOrd = new Map;
    for (let round of rounds) {
        round.matches = createMatchOrd(round.matches, entryOrd);
        entryOrd = createEntryOrd(round.matches);
    }

    return rounds;
}

function createMatchOrd(matches: Array<MatchData>, oldEntryOrd: EntryOrd): Array<MatchData> {
    return matches.sort((a,b) => matchValue(a, oldEntryOrd) - matchValue(b, oldEntryOrd));
}

function createEntryOrd(matches: Array<MatchData>): EntryOrd {
    let entryOrd = new Map<String, number>;
    let count = 0;
    for (const match of matches) {
        for (const entry of match.match_entry_data) {
            entryOrd.set(entry.pokemon_name, count);
            count += 1;
        }
    }
    return entryOrd;
}

function matchValue(match: MatchData, entryOrd: EntryOrd): number {
    return match.match_entry_data.reduce((acc, entry) => {
        let entryVal = entryOrd.get(entry.pokemon_name);
        if (entryVal === undefined || entry.is_from_revival) {
            entryVal = Infinity;
        }
        return Math.min(acc, entryVal);
    }, Infinity);
}