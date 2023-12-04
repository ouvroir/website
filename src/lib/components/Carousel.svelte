<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n/i18n';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import type { Project } from '$lib/types';

	export let data: Project[];

	let currentIndex = 0;
	let transitioning = false;
	let direction: 'right' | 'left' = 'right';

	let touchStartX = 0;
	let touchEndX = 0;

	const setIndex = (idx: number) => {
		stopRotation();
		direction = idx > currentIndex ? 'right' : 'left';
		currentIndex = idx;
		transition();
		setTimeout(() => startRotation(), 2000);
	};
	const increaseIndex = () => {
		direction = 'right';
		currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
		transition();
	};
	const decreaseIndex = () => {
		direction = 'left';
		currentIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
		transition();
	};

	const transition = () => {
		console.log('set transition', true);
		transitioning = true;
		setTimeout(() => {
			console.log('set transition', false);
			transitioning = false;
		}, 450);
	};

	const handleTouchStart = (event: TouchEvent) => {
		touchStartX = event.touches[0].clientX;
	};

	const handleTouchMove = (event: TouchEvent) => {
		touchEndX = event.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		clearInterval(interval);
		if (touchStartX > touchEndX + 30) {
			// Swiped left
			increaseIndex();
		} else if (touchStartX + 30 < touchEndX) {
			// Swiped right
			decreaseIndex();
		}
	};

	let interval: NodeJS.Timer;
	const startRotation = () => (interval = setInterval(increaseIndex, 5000));
	const stopRotation = () => clearInterval(interval);
	const resetInterval = () => {
		stopRotation();
		startRotation();
	};

	onMount(() => {
		startRotation();
		return () => stopRotation();
	});

	$: current = data[currentIndex];
	$: inFlyParams = direction === 'right' ? { x: '100%' } : { x: '-100%' };
	$: outFlyParams = direction === 'right' ? { x: '-100%' } : { x: '100%' };
	$: bannerImgUrl = current.meta.bannerImage
		? `${base}/images/projets/banner/${current.meta.bannerImage}`
		: null;
	$: pageImgUrl = current.meta.pageImage
		? `${base}/images/projets/${current.meta.pageImage}`
		: null;
	$: imgUrl = bannerImgUrl ? bannerImgUrl : pageImgUrl;

	$: console.log('pageImage', data[currentIndex].meta.pageImage);
	$: console.log('bannerImage', data[currentIndex].meta.bannerImage);
</script>

<div
	class="carousel"
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
>
	{#if !transitioning}
		<a href={`${$t('route.projects')}/${data[currentIndex].meta.slug}`}>
			<img
				class="active-img"
				src={imgUrl}
				alt={`${$t('project.img.alt')} ${data[currentIndex].meta.title}`}
				in:fly={inFlyParams}
				out:fly={outFlyParams}
			/>
		</a>
	{/if}
	<div class="banner">
		<h1 class="title">{current.meta.title}</h1>
		<p class="description">{current.meta.description}</p>
		<ul class="controls">
			{#each data as _, i}
				<li class="control">
					<button
						id={`${i}`}
						class={`control-dot ${i === currentIndex ? 'carousel-active' : ''}`}
						on:click={() => setIndex(i)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.carousel {
		position: relative;
		grid-column: 2 / -2;
		height: 30rem;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale();
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: transform 0.5s ease;
		transition: filter 0.2s ease;

		&:hover {
			filter: none;
		}
	}

	img.active-img {
		opacity: 1;
	}

	.banner {
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 0;
		width: 30%;
		height: 100%;
		background-color: rgb(38, 38, 38, 0.7);
		color: white;
		padding: 1rem;
	}

	.title {
		font-size: 2.5rem;
		font-weight: 400;
		line-height: 2rem;
		padding-bottom: 1.5rem;
	}

	.description {
		line-height: 1.5rem;
	}

	.controls {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		column-gap: 0.5rem;
		width: 50%;
		border: none !important;
		margin: auto;
		margin-bottom: 1.5rem;
	}

	button {
		--radius: 0.5rem;
		all: unset;
		width: var(--radius);
		height: var(--radius);
		border-radius: 50%;
		/* background-color: white; */
		border: solid 1px white;
		cursor: pointer;
	}

	.carousel-active {
		background-color: white;
		border: solid 1px white;
	}

	@media screen and (max-width: 1024px) {
		.banner {
			width: 50%;
		}
	}
</style>
