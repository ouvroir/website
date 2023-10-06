<script lang="ts">
	import { t } from '$i18n/i18n';
	import type { Member } from '$lib/types';
	import { aboutPageTitle } from '$lib/stores.js';
	import { localize } from '$i18n/i18n';

	import TeamCard from '$lib/components/TeamCard.svelte';

	export let data;

	$: doc = $localize(data.doc)[0];
	$: team = data.team.length > 0 ? $localize(data.team) : [];

	$: dir = team ? team.filter((d: Member) => d.meta.status === 'dir_sc') : [];
	$: members = team ? team.filter((d: Member) => d.meta.status === 'member') : [];
	$: coord = team ? team.filter((d: Member) => d.meta.status === 'coord') : [];

	$: $aboutPageTitle = doc.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if doc.html}
	<article class="text-body">
		{@html doc.html}
		{#if team && team.length > 0}
			<h2 id="about-team-title">{$t('about.team')}</h2>
			<div class="team-section">
				<h3>{$t('about.team.dir_sc')}</h3>
				<ul class="team">
					{#each dir as m}
						<li>
							<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
								<TeamCard data={m} />
							</a>
						</li>
					{/each}
				</ul>
				<h3>{$t('about.team.coord')}</h3>
				<ul class="team">
					{#each coord as m}
						<li>
							<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
								<TeamCard data={m} />
							</a>
						</li>
					{/each}
				</ul>
				<h3>{$t('about.team.members')}</h3>
				<ul class="team">
					{#each members as m}
						<li>
							<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
								<TeamCard data={m} />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</article>
{/if}

<style>
	#about-team-title {
		margin-bottom: 2.5rem;
	}
	.team-section {
		display: contents;
	}

	ul a {
		all: unset;
		cursor: pointer;
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
