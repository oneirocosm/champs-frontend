export interface MatchEntryData {
    pokemon_name: string;
    is_winner: boolean;
    is_from_revival: boolean;
    match_entry_id: number;
}

export interface MatchData {
    match_entry_data: Array<MatchEntryData>;
}

export interface RoundData {
    round_name: string;
    matches: Array<MatchData>;
}

export interface PairData {
    linkStart: number;
    linkEnd: number;
}

export interface LinkData {
        startHandle: string;
        endHandle: string;
}