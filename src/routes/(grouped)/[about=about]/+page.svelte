<script lang="ts">
	import { t } from '$i18n/i18n';
	import { aboutPageTitle } from '$lib/stores.js';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import { members, about } from '$lib/stores.js';

	if(!$members || !$about) throw new Error('No data found');

	$: dir = $members.filter((d) => d.meta.status === 'dir_sc');
	$: membs = $members.filter((d) => d.meta.status === 'member');
	$: coord = $members.filter((d) => d.meta.status === 'coord').sort((a, b) => a.meta.order! - b.meta.order!)

	$: $aboutPageTitle = $about.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if $about.html}
	<article class="text-body">
		{@html $about.html}
		{#if $members}
			<h2 id="about-team-title">{$t('about.team')}</h2>
			<div class="team-section">
				<h3>{$t('about.team.dir_sc')}</h3>
				<ul class="team">
					{#each dir as m}
						<li>
							<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
								<TeamCard bind:data={m} />
							</a>
						</li>
					{/each}
				</ul>
				<h3>{$t('about.team.coord')}</h3>
				<ul class="team">
					{#each coord as m}
						<li>
							<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
								<TeamCard bind:data={m} />
							</a>
						</li>
					{/each}
				</ul>
				<h3>{$t('about.team.members')}</h3>
				<ul class="team">
					{#each membs as m}
						<li>
							<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
								<TeamCard bind:data={m} />
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
