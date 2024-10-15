<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { ContentList } from '$lib/components';
</script>

<svelte:head>
	<title>{$t('head.resources')}</title>
</svelte:head>

<ContentList />

<style>
	.tags-container {
		grid-column: span 2;
	}

	.container {
		/* margin-top: 1rem; */
		grid-column: 2/-2;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 18rem));
		grid-auto-flow: dense;
		gap: 3rem;
		flex-wrap: wrap;
		margin-top: 4rem;
	}

	/** All touch screens */
	@media screen and (max-width: 1024px) {
		.container {
			grid-column: 1/-1;
		}
	}

	/** Tablet horizontal */
	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.container {
			grid-column: 1/-1;
			grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

			/* column-gap: 0; */
		}
	}

	/** Mobile and Tablet vertical */
	@media screen and (max-width: 820px) {
		.container {
			grid-column: 1/-1;
			grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		}
	}
</style>
