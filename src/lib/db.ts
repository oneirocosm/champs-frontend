import { Client, Pool } from 'pg';
import { env } from '$env/dynamic/private';
import * as fs from 'fs';

const pool = new Pool({
    user: env.PGUSER,
    host: env.PGHOST,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,
    port: Number(env.PGPORT),
})

const selectPageData = 
`WITH match_entry_data as (
    SELECT
        m_entrs.match_id,
        JSON_AGG(JSON_BUILD_OBJECT(
            'pokemon_name', pkmn.pokemon_name,
            'is_winner', m_entrs.is_winner,
            'is_from_revival', m_entrs.is_from_revival,
            'match_entry_id', m_entrs.match_entry_id
        )) as match_entry_data
    FROM pokemon pkmn
    INNER JOIN match_entries m_entrs
        ON pkmn.pokemon_id = m_entrs.pokemon_id
    GROUP BY m_entrs.match_id
),
match_data as (
    SELECT
        matches.round_id,
        JSON_AGG(
            m_entr_dat
        ) match_data
    FROM matches
    INNER JOIN match_entry_data as m_entr_dat
        ON matches.match_id = m_entr_dat.match_id
    GROUP BY matches.round_id
),
round_data as (
    SELECT JSON_BUILD_OBJECT(
        'round_name', rounds.round_name,
        'matches', match_data
    ) round_data
FROM rounds
INNER JOIN match_data
    ON rounds.round_id = match_data.round_id
ORDER BY rounds.round_id DESC
)
SELECT JSON_AGG(round_data) FROM round_data;`;

const selectPairs = 
`WITH round_entries AS
(
    SELECT matches.round_id, entries.pokemon_id, entries.match_entry_id, entries.is_from_revival
    FROM match_entries entries
    INNER JOIN matches
    ON entries.match_id = matches.match_id
)
SELECT JSONB_AGG(JSONB_BUILD_OBJECT(
    'linkStart', curr.match_entry_id,
    'linkEnd', nxt.match_entry_id))
FROM round_entries curr
INNER JOIN round_entries nxt
ON curr.round_id + 1 = nxt.round_id AND curr.pokemon_id = nxt.pokemon_id AND NOT nxt.is_from_revival;`;

export async function getPageData() {
    return pool.query(selectPageData);
}

export async function getPairData() {
    return pool.query(selectPairs);
}

export const connectToDb = async () => await pool.connect();