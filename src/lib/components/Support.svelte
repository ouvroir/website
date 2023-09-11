<script lang="ts">
	import { base } from '$app/paths';

	export let content;
</script>

{#if content}
	<section class="support">
		<div class="banner-content">
			<article id="support">
				{@html content.html}
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
		/* border-top: solid 0.1rem orangered; */
		/* border-bottom: solid 0.1rem orangered; */
		/* background-color: rgb(38, 38, 38); */
		background-color: rgba(255, 68, 0, 0.1);
		background-color: rgba(137, 43, 226, 0.3);
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
