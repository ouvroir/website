<script lang="ts">
	import { t } from '$i18n/i18n';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import type { Member } from '$lib/types';
	import { aboutPageTitle } from '$lib/stores.js';

	export let data;

	$: dir = data.team ? data.team.filter((d: Member) => d.meta.status === 'dir_sc') : [];
	$: members = data.team ? data.team.filter((d: Member) => d.meta.status === 'member') : [];
	$: coord = data.team ? data.team.filter((d: Member) => d.meta.status === 'coord') : [];

	$: $aboutPageTitle = data.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if data.html}
	<article class="text-body">
		{@html data.html}
		{#if data.team}
			<h2>{$t('about.team')}</h2>
			<div class="team-section">
				<h3>{$t('about.team.dir_sc')}</h3>
				<ul class="team">
					{#each dir as m}
						<TeamCard data={m} />
					{/each}
				</ul>
				<h3>{$t('about.team.coord')}</h3>
				<ul class="team">
					{#each coord as m}
						<TeamCard data={m} />
					{/each}
				</ul>
				<h3>{$t('about.team.members')}</h3>
				<ul class="team">
					{#each members as m}
						<TeamCard data={m} />
					{/each}
				</ul>
			</div>
		{/if}
	</article>
{/if}

<style>
	.team-section {
		display: contents;
	}

	h3 {
		color: var(--clr-accent);
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: 300;
		margin: 4rem 0 2rem 0;
	}

	h3:first-child {
		margin-top: 0;
	}
</style>
