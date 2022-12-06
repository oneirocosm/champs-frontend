<script lang="ts">
    export let entry = {};
</script>

<div class:winner="{entry.is_winner}">
    {entry.pokemon_name}
</div>

<style lang="scss">
    div {
        background-color: orangered;
        border-radius: 1.5rem;
        border: 1px solid black;
        padding: 0.5rem 1rem;
        margin: 0.1rem;
        white-space: nowrap;

        &.winner {
            background-color: skyblue;
            font-weight: bold;
            border: 2px solid black;
        }
    }
</style>