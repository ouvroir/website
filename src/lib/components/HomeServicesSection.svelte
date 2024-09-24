<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { Vr, Calendar, Venn } from '$components';
	import { screenType } from '$lib/stores';

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
</script>

<section id="services">
	<h1>
		{$t('home.services.title')}
	</h1>

	<ul class="services-list">
		<li class="services-li">
			{#if !smallScreen}
				<span class="services-logo-container">
					<Vr />
				</span>
			{/if}
			<h2>{$t('home.services.equipement.title')}</h2>
			<p>
				{$t('home.services.equipement')}
			</p>
			<a href={$t('route.services.equipement')}>{$t('home.services.equipement.cta')}</a>
		</li>
		<li class="services-li">
			{#if !smallScreen}
				<span class="services-logo-container">
					<Calendar />
				</span>
			{/if}
			<h2>{$t('home.services.reservation.title')}</h2>
			<p>{$t('home.services.reservation')}</p>
			<a href={$t('route.services.reservation')}>{$t('home.services.reservation.cta')}</a>
		</li>
		<li class="services-li">
			{#if !smallScreen}
				<span class="services-logo-container">
					<Venn />
				</span>
			{/if}
			<h2>{$t('home.services.meetups.title')}</h2>
			<p>
				{$t('home.services.meetups')}
			</p>
			<a href={$t('route.services.meetups')}>{$t('home.services.meetups.cta')}</a>
		</li>
	</ul>
</section>

<style>
	section {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		color: var(--clr-b);
		min-height: 100vh;
	}

	h1 {
		grid-column: popout;
		text-align: center;
		/* margin-bottom: 5rem; */
		font-size: var(--fs-700);
		font-weight: 600;
		line-height: 3.2rem;
	}

	h2 {
		font-size: var(--fs-500);
		font-weight: 600;
		margin-bottom: 1rem;
		height: fit-content;
	}

	p {
		font-size: var(--fs-300);
		font-weight: 400;
		margin-bottom: 1rem;
	}

	ul {
		grid-column: feature;
		columns: 3 25rem;

		& > li {
			break-inside: avoid;
		}
	}
</style>
