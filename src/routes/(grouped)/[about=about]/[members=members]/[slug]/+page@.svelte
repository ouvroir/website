<script lang="ts">
	import { TeamCard } from '$lib/components';
	import { members } from '$lib/stores';
	import { page } from '$app/stores';

	if (!$members) throw new Error('No data found');

	$: m = $members.find((m) => m.meta.slug === $page.params.slug);
</script>

<section>
	<header>
		<TeamCard data={m} pageMode />
	</header>

	<article class="text-body">
		{@html m?.html}
	</article>
</section>

<style>
	section {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		padding-bottom: var(--content-bottom-padding);
	}
	header {
		/** TODO Need to find a solution to stop sticky when scroll to far down */
		/* position: sticky;
		height: fit-content;
		top: 4rem; */
		grid-column: popout;
		bottom: 200rem;
		font-size: var(--fs-title);
		padding-bottom: var(--padding-title);
	}

	article {
		grid-column: content-start / popout-end;
	}

	@media screen and (max-width: 820px) {
		header {
			grid-column: full;
		}
		article {
			grid-column: 1/-1;
			grid-row: 3;
		}
	}
</style>
