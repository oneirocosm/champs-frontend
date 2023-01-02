<script lang="ts">
    import type {MatchEntryData} from '$lib/types';
    export let entry : MatchEntryData;
</script>

<div class:winner="{entry.is_winner}" id="entry{entry.match_entry_id}">
    {entry.pokemon_name}
</div>

<style lang="scss">
    div {
        background-color: var(--color-sv-menu-gray);
        color: var(--color-sv-menu-text-light);
        border-radius: 0.5rem;
        border: 1px solid black;
        padding: 0.5rem 1rem;
        margin: 0.1rem;
        white-space: nowrap;

        &.winner {
            background-color: var(--color-sv-menu-yellow);
            color: var(--color-sv-menu-text-dark);
            font-weight: bold;
            border: 2px solid black;
        }
    }
</style>