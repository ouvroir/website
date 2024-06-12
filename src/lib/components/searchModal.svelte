<script lang="ts">
	import SearchResultLi from './searchResultLi.svelte';
	import { searchModalOpen, searchIndex } from '$lib/stores';
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n/i18n';

	const clickOutside = (e: MouseEvent) => {
		e.stopPropagation();

		const target = e.target as HTMLButtonElement;
		if (!target) console.warn('Modal clickoutside: No target found');

		if (target.classList.contains('search-modal-bg')) {
			searchModalOpen.set(false);
		}
	};

	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'Space') {
			// If the event's target is an input field and the key is the space bar, ignore the event
			searchInput += ' ';
			e.preventDefault();
		}
		// Otherwise, handle the event as usual
		// ...
	}

	let searchInput: string = '';
	let result = {};

	$: result = $searchIndex.search(searchInput);

	onMount(() => {
		//disable scroll
		window.addEventListener('scroll', (e) => e.preventDefault(), { passive: false });
		return () => window.removeEventListener('scroll', (e) => e.preventDefault());
	});
</script>

{#if $searchModalOpen}
	<div class="search-modal-bg" on:click={clickOutside} aria-hidden="true">
		<div class="search-modal-container">
			<div class="input-container">
				<label for="search-input"><i class="bx bx-search"></i></label>
				<input
					autofocus="true"
					type="text"
					id="search-input"
					placeholder="Search"
					autocomplete="off"
					bind:value={searchInput}
					on:keydown={handleKeydown}
				/>
			</div>
			<section class="result-container">
				{#each Object.keys(result) as kind}
					<h2>{kind}</h2>
					<ul>
						{#each result[kind] as r}
							<li>
								<SearchResultLi {...r} />
							</li>
						{/each}
					</ul>
				{/each}
			</section>
		</div>
	</div>
{/if}

<style>
	:root {
		--fs-placeholder: 1.3rem;
	}

	.search-modal-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-modal-container {
		max-height: 90%;
		overflow-y: scroll;
		width: 50%;
		min-height: 10%;
		background-color: white;
		border-radius: 10px;
		padding: 1rem 1rem;
	}

	.input-container {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		border-radius: 5px;
		border: solid 1px #303742;
		font-size: var(--fs-placeholder);
	}

	.input-container i {
		height: 100%;
		font-size: var(--fs-placeholder);
	}

	#search-input {
		font-size: var(--fs-placeholder);
		font-weight: 200;
		padding: 0.5rem;
		border: none;
	}

	#search-input:focus {
		outline: none;
	}

	.result-container {
		min-height: 5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 0;
		text-align: left;

		& > ul {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		& li {
			font-size: 1rem;
			text-align: left;
		}
	}
</style>
