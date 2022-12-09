export interface MatchEntryData {
    pokemon_name: string;
    is_winner: boolean;
    is_from_revival: boolean;
}

export interface MatchData {
    match_entry_data: Array<MatchEntryData>;
}

export interface RoundData {
    round_name: string;
    matches: Array<MatchData>;
}