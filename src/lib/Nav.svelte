<script>
  export let className = '';
</script>

<nav>
  <ul class="{className}">
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
  </ul>
</nav>

<style lang="scss">
  nav ul {
    font-size: 1.5rem;
    margin: 0;
    list-style: none;
    padding: 3px 5px;
    background: var(--color-champs-gray-dark);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);

    &.alt {
      background: blue;
    }

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    li {
      display: inline;
    }
  }
</style>