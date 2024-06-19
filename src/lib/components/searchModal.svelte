<script lang="ts">
	import SearchResultLi from './searchResultLi.svelte';
	import { searchModalOpen, searchIndex } from '$lib/stores';
	import { onMount } from 'svelte';
	import { focusable_children, trap } from '$lib/utils/actions/focus';
	import { fade } from 'svelte/transition';
	import { t } from '$lib/i18n/i18n';

	const closeModal = (e: MouseEvent) => {
		e.stopPropagation();

		const target = e.target as HTMLButtonElement;

		if (!target) console.warn('Modal clickoutside: No target found');

		if (
			target.classList.contains('search-modal-bg') ||
			target.classList.contains('btn-close') ||
			target.parentElement?.classList.contains('btn-close')
		) {
			searchModalOpen.set(false);
		}
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			// If the event's target is an input field and the key is the
			// space bar, ignore the event
			searchInput += ' ';
			e.preventDefault();
		} else if (e.code === 'Escape') {
			searchModalOpen.set(false);
		} else if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
			// handleFocus(e);
			e.preventDefault();
		}
	};

	const handleFocus = (e: KeyboardEvent) => {
		if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
			const group = focusable_children(e.currentTarget as HTMLElement);
			const selector = 'li, input';

			if (e.key === 'ArrowDown') {
				group.next(selector);
			} else {
				group.prev(selector);
			}
		}
	};

	let searchInput: string = '';
	let result = {};
	$: result = $searchIndex.search(searchInput);

	let modalWidth: number;
	$: if (modalWidth) console.log(modalWidth);

	onMount(() => {
		// disable scroll
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleFocus);
		return () => {
			// enable scroll
			document.body.style.overflow = 'auto';
			document.removeEventListener('keydown', handleFocus);
		};
	});
</script>

{#if $searchModalOpen}
	<div
		class="search-modal-bg"
		on:click={closeModal}
		aria-hidden="true"
		in:fade={{ duration: 1000, delay: 1000 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			class="search-modal-container"
			role="search"
			bind:clientWidth={modalWidth}
			on:keydown={handleFocus}
			use:trap
		>
			<div class="input-container">
				<label id="search-icon" for="search-input"><i class="bx bx-search"></i></label>
				<input
					autofocus
					type="text"
					id="search-input"
					placeholder={$t('search.ui.placeholder')}
					autocomplete="off"
					bind:value={searchInput}
					on:keydown={handleKeydown}
				/>
				<button class="btn-close" on:click={closeModal}>
					<i class="bx bx-x"></i>
				</button>
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
	:global(:root) {
		--fs-placeholder: 1.2rem;
		--fs-result-p: 0.9rem;
		--inside-margin: 2rem;
		--input-paddingLeft: 1.5rem;
		--result-paddingLeft: calc(var(--inside-margin) + var(--input-paddingLeft));
		--result-marginTop: 2rem;
		--modal-min-width: 10rem;
	}

	.search-modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
		display: flex;
		justify-content: center;
		padding-top: 10%;
	}

	.search-modal-container {
		width: 40%;
		max-width: 40rem;
		min-width: 30rem;
		min-height: 10%;
		max-height: 90%;
		background-color: white;
		border-radius: var(--border-radius);
		padding-bottom: 1.5rem;
		filter: drop-shadow(2px 4px 16px #0003);
		overflow: hidden;
	}

	@media (max-width: 600px) {
		.search-modal-bg {
			padding-top: 0;
		}
		.search-modal-container {
			width: 100%;
			height: 100%;
			min-height: none;
			max-height: none;
			min-width: none;
			max-width: none;
		}
	}

	.input-container {
		display: flex;
		align-items: center;
		height: 3.5rem;
		padding: 0 var(--input-paddingLeft);
		font-size: var(--fs-placeholder);
		background-color: var(--clr-green-ouvroir);
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		border: solid 1px #303742;
	}

	label i {
		width: var(--inside-margin);
		font-size: var(--fs-placeholder);
		color: white;
	}

	.btn-close {
		all: unset;
		cursor: pointer;

		& > i {
			color: white;
			width: var(--inside-margin);
		}
	}

	#search-icon {
		width: var(--inside-margin);
		align-self: center;
	}

	#search-input {
		background-color: var(--clr-green-ouvroir);
		color: white;
		font-size: var(--fs-placeholder);
		font-family: var(--ff-sans);
		font-weight: 500;
		padding: 0.5rem;
		padding-left: 0;
		border: none;
		width: 100%;
	}

	#search-input:focus {
		outline: none;
	}

	h2 {
		margin-top: var(--result-marginTop);
		margin-left: var(--result-paddingLeft);
		font-size: var(--fs-result-p);
		font-weight: 600;
	}

	.result-container {
		min-height: 5rem;
		display: flex;
		height: 100%;
		flex-direction: column;
		gap: 1rem;
		text-align: left;
		overflow-y: scroll;
		padding-bottom: var(--result-marginTop);

		& > ul {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		& li {
			font-size: 1rem;
			text-align: left;
		}
	}
</style>
