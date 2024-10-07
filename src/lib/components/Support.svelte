<script lang="ts">
	import { base } from '$app/paths';
	import { localize } from '$lib/i18n/i18n';
	import { page } from '$app/stores';
	import { support } from '$lib/stores';
	import { Quebec, Udem, CFI } from '$components';

	console.log('support', $support);
</script>

{#if $support}
	<section>
		<h2>{@html $support.html}</h2>
		<ul class="finance-logos">
			<li>
				<a href="https://www.umontreal.ca/" rel="external" target="_blank">
					<Udem />
				</a>
				<p>
					Du septembre 2022 au août 2027, le projet est financé par le programme de subventions de
					partenariat du CRSH.
				</p>
			</li>
			<li>
				<a href="https://www.innovation.ca/" rel="external" target="_blank">
					<CFI />
				</a>
				<p>Du septembre 2022 au août 2027</p>
			</li>
			<li>
				<a
					href="https://www.economie.gouv.qc.ca/bibliotheques/programmes/aide-financiere/programme-de-soutien-aux-organismes-de-recherche-et-dinnovation-pso/cofinancement-du-gouvernement-du-quebec-aux-programmes-de-la-fondation-canadienne-pour-linnovation-fci/fonds-dinnovation/"
					rel="external"
					target="_blank"
				>
					<Quebec />
				</a>
			</li>
		</ul>
	</section>
{/if}

<style>
	section {
		grid-column: full;
		/* border-top: solid 1px var(--clr-b); */
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		box-shadow: 0 -10px 1.5rem -10px var(--clr-b);
		display: grid;
		grid-template-columns: subgrid;
	}

	.finance-logos {
		grid-column: feature;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
		margin-top: 3rem;
	}

	li {
		width: 25rem;
		height: 100%;
		box-shadow: 0.5px 0.5px 0.5rem var(--clr-b);
		padding: 1rem;
		border-radius: var(--border-radius);
		display: flex;
		flex-direction: column;
		background-color: var(--clr-b);
		flex-grow: 1;

		& svg {
			margin-bottom: 2rem;
		}

		& p {
			color: var(--clr-a);
			font-weight: 200;
			font-size: var(--fs-300);
			line-height: 1.5rem;
			margin-top: auto;
			height: max-content;
			display: block;
		}
	}

	h2 {
		margin: 0;
		grid-column: feature;
		font-size: var(--fs-700);
		font-weight: 700;
		display: flex;
		flex-direction: row;
		padding: 3rem 2rem;
		height: max-content;
		margin-top: 3rem;
		color: var(--clr-b);

		& p {
			width: 36ch;
			margin: auto;
			height: max-content;
			line-height: 4rem;
			& a {
				color: var(--clr-b);
			}
		}
	}
</style>
