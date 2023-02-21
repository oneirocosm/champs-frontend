# Champs in the Making Website
A website that visualizes the tournament bracket from the [**Champs in the Making** podcast](https://twitter.com/champsmaking)!

This website is built using a combination of SvelteKit and PostgreSQL.  It is still being updated with new features and matchups.

## About the Podcast
**Champs in the Making** is a podcast where the hosts of the [Moonshot Podcast Network](https://moonshotpods.com/) (previously named **The Orange Groves** podcast network) take a bracket of all of the [Pokémon](https://www.pokemon.com/) in existence and decide pair by pair, which one they want more.  Since I am friends with many members of this network, I decided to take some time creating a website that can convey this bracket in a visual form.

## Goals of the Project

### Learn SvelteKit
I have used Svelte a little in the past, but I have never used it for a Full Stack website.  As SvelteKit recently hit 1.0, now is a perfect time for me to try using it for myself.

### HTML and CSS First
For better or worse, I like [minimizing the amount of JavaScript required](https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript) to view a website. The HTML and CSS should be able to stand on their own, and the JavaScript that remains should be used to improve upon that experience.  Admittedly, this is difficult to do with a framework like Svelte.  After all, frameworks themselves are reliant on it.  But even though that is true, a significant portion of the content can be created with Server-Side Rendering before being sent to the client.  This means that a significant part of the website that would rely on JavaScript does not need to be run on the client, and because of that, users who cannot use Javascript miss less of the application.

### Extensible
While this is starting as a way to display one tournament bracket, I want to keep this open to the idea that it can be extended to others as well.  This means that I need to be able to eventually support user-inputs and different types of rules used in different types of brackets.  While those details don't need to be at the front of my brain right now, they should be in the back of my mind as I continue to make architecture decisions.

## Challenges
Throughout the creation of this website, a decent number of unexpected challenges have come up.  Here are some that come to mind:
- [x] How to query large amounts of nested data using PostgreSQL
- [x] How to query recursively using PostgreSQL (not currently used in the project)
- [ ] How to draw generic, resizeable curves using SVG (partially solved at this point since curves that are not C2 continuous at points other than the center still can be deformed)
- [x] How to design a bracket where previous rounds can be shuffled to reflect the order of future rounds
- [ ] How to create a custom Red Black Tree capable of defining an arbitrary ordering of elements (not currently used in the project)
- [ ] How to achieve specific CSS styling effects such as fading while scrolling (partially solved, but not entirely)
- [x] How to draw connection lines for an entrant moving between rounds (solved with client-side JavaScript so far)
- [ ] How to create a dynamic layout for matches that adjust based on the particpants around them (not solved yet)

## Building the Website
In order to run the application for yourself, you will first need to install dependencies with `pnpm install` (or `npm install` or `yarn`).  Also, you will need a tournament database to load the relevant data into the application.  I am currently keeping that information [here](https://github.com/oneirocosm/champs-db)!  Once that is installed, you will need to run the [create script](https://github.com/oneirocosm/champs-db/blob/master/create.sql) to generate your database.

From here, you can start a development server with the command:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

If you would prefer to create a production build, you can do that using

```bash
pnpm run build
```

You can also preview the production build with `pnpm run preview`.

## Future Goals
One short-term goal is to add more data anlysis features to the website.  This can lead to a really fun exploration of trends that have occured throughout the entirety of the bracket.  My ultimate future goal for this website is for users to be able to submit their own pokemon bracket results to the website.  This would greatly expand what the website represents and can tie back in with some of the data analysis ideas from before.
