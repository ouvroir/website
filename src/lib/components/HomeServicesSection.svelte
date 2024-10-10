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
			<i class="bx bxs-camera-movie"></i>

			<h2>{$t('home.services.equipement.title')}</h2>
			<p>
				{$t('home.services.equipement')}
			</p>
			<a href={$t('route.services.equipement')}>{$t('home.services.equipement.cta')}</a>
		</li>
		<li class="services-li">
			<i class="bx bxs-calendar-event"></i>

			<h2>{$t('home.services.reservation.title')}</h2>
			<p>{$t('home.services.reservation')}</p>
			<a href={$t('route.services.reservation')}>{$t('home.services.reservation.cta')}</a>
		</li>
		<li class="services-li">
			<i class="bx bxs-map-pin"></i>

			<h2>{$t('home.services.meetups.title')}</h2>
			<p>
				{$t('home.services.meetups')}
			</p>
			<a href={$t('route.services.meetups')}>{$t('home.services.meetups.cta')}</a>
		</li>
	</ul>
</section>

<style>
	i {
		font-size: 10rem;
		color: var(--clr-b);
		margin: auto;
	}
	section {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		color: var(--clr-b);
		align-items: center;
		justify-content: center;
		padding: 5rem 0;
	}

	h1 {
		grid-column: popout;
		text-align: center;
		margin-bottom: 7rem;
		font-size: var(--fs-700);
		font-weight: 600;
		line-height: 3.2rem;
	}

	h2 {
		font-size: var(--fs-500);
		font-weight: 600;
		margin-top: 0.8rem;
		margin-bottom: 1rem;
		height: fit-content;
		text-align: center;
	}

	p {
		font-size: var(--fs-300);
		font-weight: 400;
		line-height: 1.8rem;
		margin: 1rem 0;
	}

	a {
		font-size: var(--fs-300);
		color: var(--clr-b);
		font-weight: 500;
	}

	ul {
		grid-column: feature;
		columns: 3 25rem;
		/* width: fit-content; */
		/* margin: 0 auto; */

		& > li {
			max-width: 25rem;
			break-inside: avoid;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			margin-bottom: 4rem;
		}
	}
</style>
