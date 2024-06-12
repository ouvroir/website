<script lang="ts">
	import { searchModalOpen } from '$lib/stores';
	import { t } from '$lib/i18n/i18n';

	$: label = $t('search.ui.placeholder');
</script>

<form class="search-bar-container" action="/search">
	<i id="search-icon" class="bx bx-search"></i>
	<input
		on:mousedown|preventDefault={() => ($searchModalOpen = true)}
		on:touchend|preventDefault={() => ($searchModalOpen = true)}
		aria-hidden="true"
		placeholder={label}
		aria-label={label}
	/>

	<kbd><i class="bx bx-command"></i>K</kbd>
</form>

<style>
	:root {
		--fs-search: 0.8rem;
	}

	.search-bar-container {
		padding: 0.4rem 0.6rem;
		border: solid 1px #303742;
		display: flex;
		align-items: center;
		border-radius: 5px;
		cursor: pointer;
		transition: color 0.2s ease-in-out;
		transition: background-color 0.2s ease;
	}

	.search-bar-container:hover {
		background-color: #3037421c;
	}

	input {
		appearance: none;
		border: none;
		margin: none;
		width: 4.5rem;
		background-color: transparent;
	}
	#search-icon {
		margin-right: 0.7rem;
		font-size: 1.4rem;
	}

	kbd {
		font-size: var(--fs-search);
		display: flex;
		align-items: center;
		padding: 0.3rem 0.5rem;
		color: lightgrey;
		margin-left: 2.5rem;
		background-color: #303742;
		border-radius: 5px;

		& i {
			font-size: var(--fs-search);
			line-height: 0;
			margin-right: 0.1rem;
		}
	}
</style>
