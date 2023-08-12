<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { page } from '$app/stores';
	import { screenType } from '$lib/stores';

	let active: string;

	page.subscribe(() => {
		const match = $page.route.id?.match(/\/\[(\w+)=\1\]/);
		if (match) active = match[1];
		else active = 'home';
	});
</script>

<ul class="nav-links">
	{#if $screenType === 'mobile' || $screenType === 'tablet-vertical'}
		<li>
			<a class={`nav-link ${active === 'home' ? 'active' : ''}`} href={`${$t('route.home')}`}
				>{$t('nav.home')}</a
			>
		</li>
	{/if}
	<li>
		<a class={`nav-link ${active === 'news' ? 'active' : ''}`} href={`${$t('route.news')}`}
			>{$t('nav.news')}</a
		>
	</li>
	<li>
		<a class={`nav-link ${active === 'projects' ? 'active' : ''}`} href={`${$t('route.projects')}`}
			>{$t('nav.projects')}</a
		>
	</li>
	<li>
		<a
			class={`nav-link ${active === 'services' ? 'active' : ''}`}
			href={`${$t('route.services.presentation')}`}>{$t('nav.services')}</a
		>
	</li>
	<li>
		<a
			class={`nav-link ${active === 'about' ? 'active' : ''}`}
			href={`${$t('route.about.presentation')}`}>{$t('nav.about')}</a
		>
	</li>
</ul>

<style>
	.nav-links {
		grid-column: 3/6;
		display: flex;
		flex-wrap: wrap;
		max-width: 100%;
		gap: 1.5rem;
		row-gap: 1rem;
	}

	.nav-link {
		position: relative;
		/* width: max-content; */
	}

	.nav-link {
		text-transform: uppercase;
		font-size: 1rem;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		.nav-links {
			width: 100%;
			flex-direction: column;
			align-items: end;
		}
		.nav-link {
			color: white;
			text-align: right;
			width: max-content;
		}
	}

	/** Tablet horizontal */
	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.nav-links {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
