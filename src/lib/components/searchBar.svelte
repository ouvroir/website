<script lang="ts">
	import { searchModalOpen } from '$lib/stores';
	import { t } from '$lib/i18n/i18n';

	$: placeholder = $t('search.ui.placeholder.short');
</script>

<form
	class={`search-bar-container`}
	action="/search"
	on:mousedown|preventDefault={() => ($searchModalOpen = true)}
	on:touchend|preventDefault={() => ($searchModalOpen = true)}
>
	<i id="search-icon" class="bx bx-search"></i>
	<input {placeholder} aria-label={placeholder} />

	<kbd><i class="bx bx-command"></i>K</kbd>
</form>

<style>
	:root {
		--fs-search: 0.8rem;
	}

	.search-bar-container {
		padding: 0.3rem 0.6rem;
		display: flex;
		align-items: center;
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 1px;
		cursor: pointer;
		transition: color 0.2s ease-in-out;
		transition: background-color 0.2s ease;
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
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		padding: 0.3rem 0.5rem;
		color: var(--clr-b);
		margin-left: 2.5rem;
		background-color: var(--clr-a);
		border-radius: var(--border-radius);

		& i {
			font-size: var(--fs-search);
			line-height: 0;
			margin-right: 0.1rem;
		}
	}
</style>
