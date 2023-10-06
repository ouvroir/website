<script lang="ts">
	import { base } from '$app/paths';
	import { localize } from '$lib/i18n/i18n';
	import { page } from '$app/stores';

	export let content;

	$: showSupport = $page.route.id?.includes('about') || $page.route.id?.includes('home');
	$: doc = content ? $localize(content)[0] : null;
</script>

{#if doc && showSupport}
	<section class="support">
		<div class="banner-content">
			<article id="support">
				{@html doc.html}
			</article>
			<ul class="support-logos">
				<li>
					<a href="https://www.umontreal.ca/" rel="external" target="_blank">
						<img src={`${base}/logos/support/udem.svg`} alt="logo Université de Montréal" />
					</a>
				</li>
				<li>
					<a href="https://www.innovation.ca/" rel="external" target="_blank">
						<img src={`${base}/logos/support/cfi.svg`} alt="logo" />
					</a>
				</li>
				<li>
					<a
						href="https://www.economie.gouv.qc.ca/bibliotheques/programmes/aide-financiere/programme-de-soutien-aux-organismes-de-recherche-et-dinnovation-pso/cofinancement-du-gouvernement-du-quebec-aux-programmes-de-la-fondation-canadienne-pour-linnovation-fci/fonds-dinnovation/"
						rel="external"
						target="_blank"
					>
						<img src={`${base}/logos/support/quebec.svg`} alt="logo Québec" />
					</a>
				</li>
			</ul>
		</div>
	</section>
{/if}

<style>
	.support {
		background-color: rgba(255, 68, 0, 0.1);
		background-color: rgba(255, 68, 0, 0.4);
	}

	article {
		grid-column: span 6;
		font-size: 1.5rem;
		font-weight: 500;
		color: rgb(38, 38, 38);
	}

	.support-logos {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		grid-column: 7/-1;
		align-items: center;
		padding-left: 3rem;
	}

	.support-logos > * {
		width: 250px;
	}
	.support-logos > li:nth-child(2) {
		margin-top: 1rem;
	}
</style>
