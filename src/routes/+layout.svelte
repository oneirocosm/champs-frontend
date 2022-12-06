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

        --color-primary: var(--color-champs-yellow-dark);
        --color-background: var(--color-champs-gray-light);
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