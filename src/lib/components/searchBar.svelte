<script lang="ts">
	import { searchModalOpen } from '$lib/stores';

	$: console.log('searchModalOpen', $searchModalOpen);
</script>

<button class="search-bar-container" on:click={() => ($searchModalOpen = !$searchModalOpen)}>
	<span id="text"><i class="bx bx-search"></i>SEARCH</span>
	<span id="shortcut"><i class="bx bx-command"></i>K</span>
</button>

<style>
	.search-bar-container {
		padding: 0.4rem 0.8rem;
		border: solid 1px #303742;
		color: none;
		display: flex;
		align-items: center;
		border-radius: 5px;
		cursor: pointer;
		font-size: 0.8rem;
	}

	.search-bar-container:hover {
		background-color: #30374247;
	}

	#text {
		display: flex;
		align-items: center;
	}
	#text i {
		margin-right: 0.7rem;
		max-height: 100%;
		font-size: 0.8rem;
	}

	#shortcut {
		display: flex;
		align-items: center;
		padding: 0.3rem 0.5rem;
		color: lightgrey;
		margin-left: 2.5rem;
		background-color: #303742;
		border-radius: 5px;
	}

	#shortcut i {
		margin-right: 0.1rem;
	}
</style>
