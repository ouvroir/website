<script lang="ts">
	import { t } from '$i18n/i18n';
	import { aboutPageTitle } from '$lib/stores.js';
	import { TeamCard } from '$lib/components';
	import { members, about } from '$lib/stores.js';
	import { wrapContentBetweenH2s, generateSlug } from '$lib/utils/helpers';

	if (!$members || !$about) throw new Error('No data found');

	$: dir = $members.filter((d) => d.meta.status === 'dir_sc');
	$: membs = $members.filter((d) => d.meta.status === 'member');
	$: coord = $members
		.filter((d) => d.meta.status === 'coord')
		.sort((a, b) => a.meta.order! - b.meta.order!);

	$: $aboutPageTitle = $about.meta.title;
</script>

<svelte:head>
	<title>{$t('head.about')}</title>
</svelte:head>

{#if $about.html}
	<article class="text-body" use:wrapContentBetweenH2s>
		{@html $about.html}
		{#if $members}
			<h2 id="about-team-title">{$t('about.team')}</h2>

			<h3 id={generateSlug($t('about.team.dir_sc'))}>{$t('about.team.dir_sc')}</h3>
			<ul class="team">
				{#each dir as m}
					<li>
						<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
							<TeamCard bind:data={m} />
						</a>
					</li>
				{/each}
			</ul>
			<h3 id={generateSlug($t('about.team.coord'))}>{$t('about.team.coord')}</h3>
			<ul class="team">
				{#each coord as m}
					<li>
						<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
							<TeamCard bind:data={m} />
						</a>
					</li>
				{/each}
			</ul>
			<h3 id={generateSlug($t('about.team.members'))}>{$t('about.team.members')}</h3>
			<ul class="team">
				{#each membs as m}
					<li>
						<a href={`${$t('route.about.member')}/${m.meta.slug}`}>
							<TeamCard bind:data={m} />
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</article>
{/if}

<style>
	#about-team-title {
		margin-bottom: 2.5rem;
	}

	.team {
		list-style: none;
		margin-left: 0;
		padding-left: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		& > li {
			display: inline-block;
			/* margin-right: 1rem; */
		}
	}

	ul a {
		all: unset;
		cursor: pointer;
	}

	h3 {
		margin: 4rem 0 2rem 0;
	}

	h3:first-child {
		margin-top: 0;
	}
</style>
