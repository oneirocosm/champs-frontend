<script lang="ts">
    import Match from '$lib/Match.svelte';
</script>

<div>
    <h1>Round #</h1>
    <Match />
    <Match />
    <Match />
    <Match />
</div>

<style lang="scss">
    h1 {
        text-align: center;
    }
    
    div {
        background-color: greenyellow;
        border-radius: 1.5rem;
        border-color: black;
        padding: 0.5rem 1rem;
        margin: 1rem;
        display: flex;
        flex-direction: column;
    }
</style>