<script lang="ts">
	import { searchModalOpen, searchIndex } from '$lib/stores';
	import { search } from '$lib/utils/search';

	const clickOutside = (e) => {
		if (e.target.classList.contains('search-modal-bg')) {
			searchModalOpen.set(false);
		}
		e.stopPropagation();
	};

	let searchInput: string;
	let result = [];

	$: result = search($searchIndex, searchInput);
</script>

{#if $searchModalOpen}
	<button class="search-modal-bg" on:click={clickOutside}>
		<div class="search-modal-container">
			<div class="input-container">
				<label for="search-input"><i class="bx bx-search"></i></label>
				<input type="text" id="search-input" placeholder="Search" bind:value={searchInput} />
			</div>
			<div class="result-container"><pre>{result}</pre></div>
		</div>
	</button>
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
		padding: 1rem;
	}
</style>
