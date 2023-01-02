<script lang="ts">
    import Match from '$lib/Match.svelte';
    export let name: String = "unknown";
</script>

<div class="round">
    <h1>{name}</h1>
    <div class="matches">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    h1 {
        text-align: center;
        position:sticky;
        top: 2.5rem;
        background-color: var(--round-color-base);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        padding-top: 1rem;
        border-bottom: 3px solid black;
        z-index: 5;
    }

    .round {
        background-color: var(--round-color-base);
        border-radius: 1.5rem;
        border-color: black;
        margin: 1rem;
        display: flex;
        flex-direction: column;

        &:nth-of-type(4n+0) {
            --round-color-base: var(--color-pkmn-red); 
        }

        &:nth-of-type(4n+1) {
            --round-color-base: var(--color-pkmn-blue);
        }

        &:nth-of-type(4n+2) {
            --round-color-base: var(--color-pkmn-green);
        }

        &:nth-of-type(4n+3) {
            --round-color-base: var(--color-pkmn-purple);
        }

    }

    .matches {
        display: flex;
        //background-color: plum;
        justify-content: space-evenly;
        flex-grow: 1;
        flex-direction: column;
        margin: 0;

        /*
        mask-image: linear-gradient(to bottom, transparent 10%, black);
        mask-size: 100% 100vh;
        mask-position: 0 0;
        overflow-y: auto;
        height: 100vh;
        */
    }
</style>