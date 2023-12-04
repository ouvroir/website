<script lang="ts">
	import { t, dateToLocalizedString, localize } from '$i18n/i18n';
	import { fade } from 'svelte/transition';
	import { screenType } from '$lib/stores';
	import Vr from '$lib/components/logos/Vr.svelte';
	import Venn from '$lib/components/logos/Venn.svelte';
	import Calendar from '$lib/components/logos/Calendar.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import HomeListItem from '$lib/components/HomeListItem.svelte';
	import type { Blog, Event } from '$lib/types.js';

	export let data;

	$: news = ($localize([...data.events, ...data.posts]) as Array<Blog | Event>)
		.sort((a, b) => {
			let aDate = a.meta.kind === 'event' ? a.meta.dateStart : a.meta.date;
			let bDate = b.meta.kind === 'event' ? b.meta.dateStart : b.meta.date;

			aDate = aDate.split('T')[0];
			bDate = bDate.split('T')[0];
			return bDate.localeCompare(aDate);
		})
		.slice(0, 4);
	$: projects = $localize(data.projects.filter((p) => p.meta.cieco));
	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
</script>

<svelte:head>
	<title>{$t('head.home')}</title>
</svelte:head>

<section class="section-wrapper" in:fade={{ delay: 0, duration: 1000 }}>
	<header class="section-header">
		<h1 class="section-title">{$t('home.news.latest')}</h1>
		<!-- <div class="header-separator" /> -->
		<a href={$t('route.news')}>{$t('home.news.all')}</a>
	</header>

	<ul class="list-item">
		{#each news as e}
			{#if e.meta.kind === 'event'}
				<HomeListItem href={`${$t('route.news')}/${$t(`news.type.${e.meta.kind}`)}/${e.meta.slug}`}>
					<span class="document-tag" slot="document-tag">
						{$t(`card.${e.meta.kind}`)}
					</span>
					<h1 slot="title" class="card-item-title">{e.meta.title}</h1>
					<p slot="date" class="card-item-date">
						{$dateToLocalizedString(e.meta.dateStart.split('T')[0])}
					</p>
					<p slot="time" class="card-item-time">
						{e.meta.timeStart} - {e.meta.timeEnd} @ {e.meta.place}
					</p>
				</HomeListItem>
			{:else if e.meta.kind === 'blog'}
				<HomeListItem href={`${$t('route.news')}/${$t(`news.type.${e.meta.kind}`)}/${e.meta.slug}`}>
					<span class="document-tag" slot="document-tag">
						{$t(`card.${e.meta.kind}`)}
					</span>
					<h1 slot="title" class="card-item-title">{e.meta.title}</h1>
					<p slot="date" class="card-item-date">
						{$dateToLocalizedString(e.meta.dateStart.split('T')[0])}
					</p>
					<p slot="description" class="card-item-description">
						{e.meta.description}
					</p>
				</HomeListItem>
			{/if}
			<!-- <li class="news-li addhover">
				<a href={`${$t('route.news')}/${$t(`news.type.${e.meta.type}`)}/${e.meta.slug}`}>
					<article class="news-content">
						<span class="document-tag">{$t(`card.${e.meta.type}`)}</span>
						<h1>
							{#if e.meta.type === 'event'}
								{$dateToLocalizedString(e.meta.dateStart.split('T')[0])}
							{:else if e.meta.type === 'blog'}
								{e.meta.title}
							{/if}
						</h1>

						<p class="news-content-infos">{e.meta.timeStart} - {e.meta.timeEnd} @ {e.meta.place}</p>
						<h2>
							{#if e.meta.type === 'event'}
								{e.meta.title}
							{:else if e.meta.type === 'blog'}
								{e.meta.description}
							{/if}
						</h2>
					</article>
				</a>
			</li> -->
		{/each}
	</ul>
</section>

<section class="section-wrapper" in:fade={{ delay: 500, duration: 1000 }}>
	<header class="section-header">
		<h1 class="section-title">{$t('home.projects.title')}</h1>
		<!-- <div class="header-separator" /> -->
		<a href={$t('route.projects')}>{$t('home.projects.all')}</a>
	</header>

	<div>
		<Carousel data={projects} />
	</div>

	<ul class="list-item">
		{#each projects as p, i}
			<HomeListItem href={`${$t('route.projects')}/${p.meta.slug}`}>
				<span class="document-tag" slot="document-tag">
					{$t(`home.tag.project`)}
				</span>
				<h1 slot="title" class="card-item-title">{p.meta.title}</h1>
				<p slot="description" class="card-item-description">{p.meta.description}</p>
			</HomeListItem>
		{/each}
	</ul>
</section>

<!-- <div class="separator" /> -->

<section class="services-wrapper" id="services">
	<h1>
		{$t('home.services.title')}
	</h1>

	<ul class="services-list">
		<li class="services-li">
			{#if !smallScreen}
				<span class="services-logo-container">
					<Vr />
				</span>
			{/if}
			<h2>{$t('home.services.equipement.title')}</h2>
			<p>
				{$t('home.services.equipement')}
			</p>
			<a href={$t('route.services.equipement')}>{$t('home.services.equipement.cta')}</a>
		</li>
		<li class="services-li">
			{#if !smallScreen}
				<span class="services-logo-container">
					<Calendar />
				</span>
			{/if}
			<h2>{$t('home.services.reservation.title')}</h2>
			<p>{$t('home.services.reservation')}</p>
			<a href={$t('route.services.reservation')}>{$t('home.services.reservation.cta')}</a>
		</li>
		<li class="services-li">
			{#if !smallScreen}
				<span class="services-logo-container">
					<Venn />
				</span>
			{/if}
			<h2>{$t('home.services.meetups.title')}</h2>
			<p>
				{$t('home.services.meetups')}
			</p>
			<a href={$t('route.services.meetups')}>{$t('home.services.meetups.cta')}</a>
		</li>
	</ul>
</section>

<style>
	.section-wrapper {
		grid-column: 2 / -2;
		margin-top: 4rem;
		margin-bottom: 3rem;
	}

	section > * + * {
		margin-top: 4rem;
	}

	.section-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: baseline;
		flex-wrap: wrap;
		column-gap: 1.5rem;
		row-gap: 1rem;
	}

	section a {
		color: var(--clr-accent);
		font-weight: 300;
	}

	.section-title {
		/* color: var(--clr-accent); */
		font-weight: 300;
		font-size: 2rem;
		width: max-content;
	}

	.separator {
		grid-column: 3 /-3;
		border-bottom: solid 0.5px transparent;
		margin-top: 6rem;
	}

	.list-item {
		position: static;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		grid-auto-flow: dense;
		gap: 4rem;
		row-gap: 2rem;
	}

	.card-item-title {
		font-size: 1.2rem;
		font-weight: 400;
		line-height: 1.5rem;
	}

	.card-item-description {
		font-size: 0.9rem;
		font-weight: 300;
		margin-top: 0.2rem;
		line-height: 1.3rem;
	}

	.card-item-date,
	.card-item-time {
		font-weight: 300;
		font-size: 0.8rem;
	}

	.card-item-date {
		color: var(--clr-accent);
		font-weight: 400;
	}

	.document-tag {
		display: block;
		padding-bottom: 0.5rem;
	}

	/** Services*/

	.services-wrapper {
		grid-column: 1 / -1;
		position: relative;
		/* margin-top: 3rem; */
		margin-top: 3rem;
		margin-bottom: 7rem;
		line-height: 3rem;
		font-weight: 300;
	}

	.services-wrapper > h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		/* text-justify: center; */
		width: 100%;
		padding: 1rem 10rem;
	}

	.services-list {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 0 3rem;
	}

	.services-li {
		max-width: 30%;
		/* width: 35%; */
	}

	.services-li:nth-child(2) {
		margin: 0 auto;
	}

	.services-li h2 {
		font-size: 1.5rem;
		font-weight: 300;
		text-align: center;
	}

	.services-li p {
		font-size: 1.1rem;
		font-weight: 400;
		line-height: 2rem;
	}

	.services-li a {
		color: var(--clr-accent);
	}

	.services-logo-container {
		display: flex;
		flex-direction: row;
		width: 4rem;
		margin: auto;
		height: 6rem;
		align-items: end;
		margin-bottom: 1rem;
	}

	.header-separator {
		position: relative;
		top: 0.3rem;
		border-right: solid 1px var(--clr-accent);
		height: 1.5rem;
		width: fit-content;
		margin: 0 0.8rem;
	}

	@media screen and (max-width: 821px) {
		.services-wrapper {
			margin-bottom: 0;
		}

		#services > h1 {
			padding: 0;
			padding-top: 2rem;
			border-top: solid 0.5px var(--clr-accent);
			font-size: 2rem;
		}

		.services-list {
			display: flex;
			flex-direction: column;
			padding: 0;
			gap: 2rem;
		}
		.services-li {
			max-width: unset;
		}
		.services-li > h2 {
			text-align: left;
		}
		.services-li > span {
			display: inline;
		}
	}

	@media screen and (max-width: 480px) {
		.section-wrapper {
			grid-column: 1/-1;
		}
	}
</style>
