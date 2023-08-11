<script lang="ts">
	import { t } from '$i18n/i18n';
	import { page } from '$app/stores';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import type { Member } from '$lib/types';

	export let data;

	let dir: Member[], coord: Member[], members: Member[];
	if (data.team.length > 0) {
		dir = data.team.filter((d) => d.meta.status === 'dir_sc');
		coord = data.team.filter((d) => d.meta.status === 'coord');
		members = data.team.filter((d) => d.meta.status === 'member');
	}
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if data.html}
	<article class="text-body">
		{@html data.html}
	</article>
{/if}

{#if (data.team && data.team.length > 0 && $page.params.slug === 'membres') || $page.params.slug === 'members'}
	<section>
		<h2>{$t('about.team.dir_sc')}</h2>
		<ul class="team">
			{#each dir as m}
				<TeamCard data={m} />
			{/each}
		</ul>
		<h2>{$t('about.team.coord')}</h2>
		<ul class="team">
			{#each coord as m}
				<TeamCard data={m} />
			{/each}
		</ul>
		<h2>{$t('about.team.members')}</h2>
		<ul class="team">
			{#each members as m}
				<TeamCard data={m} />
			{/each}
		</ul>
	</section>
{/if}

<style>
	section {
		display: contents;
	}

	h2 {
		color: orangered;
		/* color: rgb(0, 0, 0, 0.7); */
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: 300;
		margin: 4rem 0 2rem 0;
	}

	h2:first-child {
		margin-top: 0;
	}
</style>
