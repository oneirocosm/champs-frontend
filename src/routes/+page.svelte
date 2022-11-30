<script lang="ts">
    import MatchEntry from '$lib/MatchEntry.svelte';
    import Match from '$lib/Match.svelte';
    import Round from '$lib/Round.svelte';

    const rounds = [
        {
            name: "round 1",
            matches: [
                {
                    contestants: [
                        {
                            name: "Contestant 1",
                        },
                        {
                            name: "Contestant 2",
                        },
                    ]
                },
                {
                    contestants: [
                        {
                            name: "Contestant 3",
                        },
                        {
                            name: "Contestant 4",
                        },
                    ]
                },
                {
                    contestants: [
                        {
                            name: "Contestant 5",
                        },
                        {
                            name: "Contestant 6",
                        },
                    ]
                },
                {
                    contestants: [
                        {
                            name: "Contestant 7",
                        },
                        {
                            name: "Contestant 8",
                        },
                    ]
                },
            ]
        },
        {
            name: "round 2",
            matches: [
                {
                    contestants: [
                        {
                            name: "Contestant 1",
                        },
                        {
                            name: "Contestant 4",
                        },
                    ]
                },
                {
                    contestants: [
                        {
                            name: "Contestant 6",
                        },
                        {
                            name: "Contestant 8",
                        },
                    ]
                },
            ]
        },
        {
            name: "round 3",
            matches: [
                {
                    contestants: [
                        {
                            name: "Contestant 1",
                        },
                        {
                            name: "Contestant 6",
                        },
                    ]
                },
            ]
        },
    ];
</script>

<h2>"WELCOME TO THE BEST IDEA FOR A PODCAST-BASED TOURNAMENT BRACKET WEBSITE OF ALL TIME"</h2>
<h1>
    CHAMPS IN <br />THE MAKING
</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="bracket">
    {#each rounds as round}
        <Round name={round.name}>
            {#each round.matches as match}
                <Match>
                    {#each match.contestants as contestant}
                        <MatchEntry name={contestant.name}/>
                    {/each}
                </Match>
            {/each}
        </Round>
    {/each}
</div>


<style lang="scss">
    @font-face {
        font-family: "Pokemon Solid";
        font-weight: 100 900;
        font-style: normal;
        src: url("/fonts/pokemon-solid.woff2") format("woff2");
    }
    @font-face {
        font-family: "Pokemon Hollow";
        font-weight: 100 900;
        font-style: normal;
        src: url("/fonts/pokemon-hollow.woff2") format("woff2");
    }
    @font-face {
        font-family: "Montserrat";
        font-style: bold;
        src: url("/fonts/montserrat-bold.woff2") format("woff2");
    }
    @font-face {
        font-family: "Montserrat";
        font-style: normal;
        src: url("/fonts/montserrat-regular.woff2") format("woff2");
    }

    h1 {
        margin: 0rem;
        padding: 0;
        font-family: "Pokemon Solid";
        font-size: 8rem;
        line-height: 12rem;
        color: var(--color-primary);
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
        paint-order: stroke fill;
        text-align: center;
    }
    h2 {
        font-family: "Montserrat";
        text-align:center;
    }

    .bracket {
        background-color: lightseagreen;
        width: 90%;
        overflow-x: scroll;
        display: flex;
    }
</style>