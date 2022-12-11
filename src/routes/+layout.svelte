<script lang="ts">
    import Nav from '$lib/Nav.svelte';
</script>
<svelte:head>
    <title>Champs in the Making</title>
</svelte:head>

<header>
    <Nav />
</header>
<main>
    <slot />
</main>
<footer>
    <p>
        This website was created by
        <a
        aria-label="oneirocosm"
        href="https://oneirocosm.com/"
        target="_blank"
        rel="nofollow noopener noreferrer"
        >oneirocosm</a>
    </p>
</footer>

<style lang="scss" global>
    @use "../reset.scss" as *;
    :root {
        --color-champs-yellow-light: rgb(255,253,172);
        --color-champs-yellow-dark: rgb(255,238,131);
        --color-champs-gray: rgb(150,150,150);
        --color-champs-gray-light: rgb(203,203,196);
        --color-champs-gray-dark: rgb(103,103,126);

        --color-sv-green: rgb(0, 163, 127);
        --color-sv-green-dark: rgb(0, 86, 67);
        --color-sv-menu-gray: rgb(20, 52, 63);
        --color-sv-menu-yellow: rgb(251, 204, 0);
        --color-sv-menu-text-dark: rgb(41, 59, 13);
        --color-sv-menu-text-light: rgb(240, 255, 255);

        --color-pkmn-red: rgb(249, 55, 12);
        --color-pkmn-blue: rgb(49, 119, 244);
        --color-pkmn-green: rgb(0, 196, 11);
        --color-pkmn-purple: rgb(195, 10, 254);

        --color-primary: var(--color-champs-yellow-dark);
        --color-background: var(--color-champs-gray-light);
        --color-fade: rgb(1, 1, 1);

    }

    header {
        position: sticky;
        top: 0;
        z-index: 10;
    }

    html {
        box-sizing: border-box;
        font-size: 16px;
    }

    body {
		background-color: var(--color-background);
		transition: background-color 0.3s;
        font-family: "Montserrat";
	}
    a {
        text-decoration: none;
        color: blue;
    }

</style>