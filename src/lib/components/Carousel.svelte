<script lang="ts">
	import { onMount } from 'svelte';
	import { localize } from '$lib/i18n/i18n';

	export let data;

	let currentIndex = 0;
	let nextIndex = 1;
	let transitioning = false;

	let touchStartX = 0;
	let touchEndX = 0;

	const setIndex = (idx: number) => {
		// clearInterval(interval);
		const direction = idx > currentIndex ? 'fromRight' : 'fromLeft';
		nextIndex = idx;
		currentIndex = idx;
		startTransition(direction);
	};
	const increaseIndex = () => {
		const outgoing = document.querySelector('#outgoing');
		// outgoing?.classList.remove('outgoing-left');
		nextIndex = (currentIndex + 1) % data.length;
		startTransition('fromRight');
	};
	const decreaseIndex = () => {
		const outgoing = document.querySelector('#outgoing');
		outgoing?.classList.remove('outgoing-right');
		outgoing?.classList.add('outgoing-left');

		nextIndex = currentIndex - 1;
		if (nextIndex < 0) nextIndex = data.length - 1;

		startTransition('fromLeft');
	};

	const startTransition = (direction: 'fromLeft' | 'fromRight') => {
		requestAnimationFrame(() => {
			const outgoing = document.querySelector('#outgoing');
			if (!outgoing) console.warn('No outgoing image found');

			outgoing?.classList.remove('incoming');

			if (direction === 'fromRight') {
				outgoing.classList.add('outgoing-right');
			} else {
				outgoing.classList.add('outgoing-left');
			}

			transitioning = true;
			currentIndex = nextIndex;

			setTimeout(() => {
				transitioning = false;
				outgoing?.classList.remove('outgoing-right');
				outgoing?.classList.remove('outgoing-left');
				outgoing?.classList.add('incoming');
			}, 500); // This should match the transition duration in CSS
		});
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

	$: current = $localize(data)[currentIndex];
	$: next = $localize(data)[nextIndex];
</script>

<div
	class="carousel"
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
>
	<img
		class="active-img"
		src={`/images/projects/banners/${current.meta.bannerImage}`}
		alt="Hello"
	/>
	<img id="outgoing" src={`/images/projects/banners/${next.meta.bannerImage}`} alt="Hello" />
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
		height: 20rem;
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
