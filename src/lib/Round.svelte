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
    }

    .round {
        background-color: greenyellow;
        border-radius: 1.5rem;
        border-color: black;
        margin: 1rem;
        display: flex;
        flex-direction: column;

    }

    .matches {
        display: flex;
        //background-color: plum;
        justify-content: space-evenly;
        flex-grow: 1;
        flex-direction: column;
        margin: 0;
    }
</style>