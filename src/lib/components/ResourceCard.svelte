<script lang="ts">
	import { t, dateToLocalizedString } from '$i18n/i18n';

	export let resource;

	const maxDescriptionLen = 150;

	$: kind = resource.meta.kind as 'blog' | 'event' | 'meeting';
	// $: resource.meta.slug ? null : encodeURIComponent
</script>

<li class="resource-card-container">
	<a href={`${$t('route.resources')}/${resource.meta.slug}`} class={`resource-card`}>
		<span class="document-tag">{$t(`card.${resource.meta.kind}`)}</span>
		<h1>
			{#if kind === 'meeting'}
				{$dateToLocalizedString(resource.meta.date)}
			{:else}
				{resource.meta.title}
			{/if}
		</h1>
		<div class="resource-card-main">
			{#if kind === 'blog'}
				<div>
					<span class="author">{resource.meta.author}</span> |
					<span>{$dateToLocalizedString(resource.meta.date)}</span>
				</div>
			{:else if kind === 'event'}
				<div>
					<span class="date">{$dateToLocalizedString(resource.meta.dateStart)}</span>
					<div class="time-place">
						<span class="time">
							{resource.meta.timeStart} - {resource.meta.timeEnd}
						</span>
						|
						<span class="place">@ {resource.meta.place}</span>
					</div>
				</div>
			{/if}
			<p class="description">
				{#if resource.meta.description}
					{resource.meta.description.length > maxDescriptionLen
						? resource.meta.description.slice(0, maxDescriptionLen) + '...'
						: resource.meta.description}
				{:else}
					...
				{/if}
			</p>
		</div>
		{#if resource.meta.tags && resource.meta.tags.length}
			<ul class="tags">
				{#each resource.meta.tags as t}
					<li id={t}>{t}</li>
				{/each}
			</ul>
		{:else if resource.meta.participants && resource.meta.participants.length > 0}
			<span class="speaker">{$t('card.speaker')}</span>
			<ul class="tags">
				{#each resource.meta.participants as t}
					<li id={t}>{t}</li>
				{/each}
			</ul>
		{/if}
	</a>
</li>

<style>
	.resource-card-container  {
		width: 10rem;
	}
	.resource-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		cursor: pointer;
		width: 100% !important;
	}
	.resource-card:hover:after {
		content: '';
		position: absolute;
		top: -5%;
		left: -5%;
		width: 110%;
		height: 110%;
		background-color: rgba(0, 0, 0, 0.03);
		z-index: -1;
	}
	.resource-card > * {
		min-height: max-content;
	}

	.resource-card:hover > h1 {
		text-decoration-color: var(--clr-accent);
	}

	.resource-card > * {
		height: max-content;
	}

	.smaller-card > ul {
		margin-top: 0.5rem;
	}

	.resource-card-main {
		/* border-top: solid 0.5px rgba(0, 0, 0, 0.2); */
		/* padding: 1rem 0; */
		height: max-content;
		margin-bottom: auto;
	}
	.resource-card-main > * + * {
		margin-top: 0.4rem;
	}

	.description {
		line-height: 1.4rem;
		font-weight: 300;
	}

	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 0.7rem;
		row-gap: 0.5rem;
		font-weight: 300;
		font-size: 0.9rem;
		padding-top: 0.5rem;
		border-top: solid 0.5px rgba(0, 0, 0, 0.2);
		font-size: 0.8rem;
	}

	h1 {
		font-size: 1.6rem;
		line-height: 1.8rem;
		text-decoration: underline;
		text-decoration-thickness: 0.25rem;
		text-decoration-color: transparent;
		transition: all ease 400ms;
	}

	.smaller-title {
		font-size: 1.2rem;
		line-height: 1.5rem;
	}

	.author {
		color: var(--clr-accent);
	}

	.date {
		display: block;
		color: var(--clr-accent);
		margin-bottom: 0.5rem;
	}

	.time-place {
		display: block;
		line-height: 1.3rem;
		/* margin-bottom: 0.7rem; */
	}

	.speaker {
		position: relative;
		font-size: 0.9rem;
		font-weight: 300;
		display: block;
		margin-bottom: 0;
		top: 1.3rem;
	}
	.speaker + ul {
		color: var(--clr-accent);
	}

	.underline {
		text-decoration-color: rgba(255, 68, 0, 0.847);
	}

	@media screen and (max-width: 850px) {
		.resource-card-main {
			padding-bottom: 0;
		}
	}
</style>
