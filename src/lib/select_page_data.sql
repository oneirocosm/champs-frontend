WITH match_entry_data as (
    SELECT
        m_entrs.match_id,
        JSON_AGG(JSON_BUILD_OBJECT(
            'pokemon_name', pkmn.pokemon_name,
            'is_winner', m_entrs.is_winner
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
SELECT JSON_AGG(round_data) FROM round_data;