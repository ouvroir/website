<script lang="ts">
	import TeamCard from '$lib/components/TeamCard.svelte';
	import { localize } from '$lib/i18n/i18n.js';

	export let data;

	$: m = $localize(data.member)[0];
</script>

<section>
	<header>
		<h1>{`${m?.meta.firstname} ${m?.meta.lastname}`}</h1>
	</header>

	<aside>
		<TeamCard data={m} pageMode />
	</aside>

	<article class="text-body">
		{@html m?.html}
	</article>
</section>

<style>
	section {
		display: contents;
		scroll-behavior: auto;
	}
	header {
		/** TODO Need to find a solution to stop sticky when scroll to far down */
		/* position: sticky;
		height: fit-content;
		top: 4rem; */
		bottom: 200rem;
		grid-column: 1/5;
		font-size: var(--fs-title);
		padding-bottom: var(--padding-title);
	}

	aside {
		position: sticky;
		height: fit-content;
		top: 10rem;
		left: 0;
		grid-column: 1/5;
		grid-row: 2;
		padding-right: 4rem;
	}

	article {
		grid-column: 5/-1;
		grid-row: 2;
	}

	@media screen and (max-width: 820px) {
		header {
			grid-column: 1/-1;
		}
		aside {
			grid-column: 1/-1;
			padding-right: 0;
			position: static;
			padding-bottom: 1.5rem;
			margin-bottom: 1.5rem;
			border-bottom: solid 2px var(--clr-accent-light);
		}
		article {
			grid-column: 1/-1;
			grid-row: 3;
		}
	}
</style>
