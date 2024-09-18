<script lang="ts">
	import { base } from '$app/paths';
	import { t } from '$i18n/i18n';
	import CrihnLogo from './logos/CrihnLogo.svelte';
	import CiecoLogo from './logos/CiecoLogo.svelte';
</script>

<footer>
	<div class="footer-content">
		<section id="contact">
			<h1>Nous trouver</h1>
			<div class="adress">
				<p>Université de Montréal</p>
				<p>Pavillon Lionel-Groulx, local C-8132</p>
				<p>3150 rue Jean-Brillant, Montréal H3T 1N8</p>
			</div>
			<h2>Nous contacter</h2>
			<a href="mailto:ouvroir@umontreal.ca">ouvroir@umontreal.ca</a>
		</section>

		<section id="follow">
			<h1>Suivez-nous</h1>
			<ul class="logos">
				<li>
					<a href="https://github.com/ouvroir" rel="external" target="_blank"
						><img src={`${base}/logos/brands/github.svg`} alt="Logo github" />
						Github</a
					>
				</li>
				<li>
					<a href="https://twitter.com/labouvroir" rel="external" target="_blank"
						><img src={`${base}/logos/brands/twitter.svg`} alt="Logo Twitter" />Twitter</a
					>
				</li>
				<li>
					<a href="https://hypothes.is/groups/pM5dq7b4/ouvroir" rel="external" target="_blank"
						><img src={`${base}/logos/brands/hypothesis.svg`} alt="Logo Hypothesis" />Hypothesis</a
					>
				</li>
				<li>
					<a
						href="https://matrix.to/#/!AaxspHhzNUgFJpDKTr:matrix.org?via=matrix.org"
						rel="external"
						target="_blank"
						><img src={`${base}/logos/brands/element.svg`} alt="Logo Element" />Element</a
					>
				</li>
				<li>
					<a href="https://mobilizon.fr/@ouvroir_lab" rel="external" target="_blank"
						><img src={`${base}/logos/brands/mobilizon.svg`} alt="Logo Mobilizon" />Mobilizon</a
					>
				</li>
				<li>
					<a href="https://www.zotero.org/groups/2480242/ouvroir" rel="external" target="_blank"
						><img src={`${base}/logos/brands/zotero.svg`} alt="Logo Zotero" />Zotero</a
					>
				</li>
			</ul>
		</section>

		<section id="about">
			<h1>À propos du laboratoire</h1>

			<div>
				<object
					data={`${base}/logos/support-new/cieco.svg`}
					aria-label="Logo Cieco"
					type="image/svg+xml"
				></object>
				<p>
					L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est
					un laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du
					Partenariat «
					<em>Des nouveaux usages des collections dans les musées d’art</em>
					»
					<a rel="external" target="_blank" href="https://cieco.umontreal.ca/">CIÉCO</a> dirigé par Johanne
					Lamoureux.
				</p>
			</div>

			<div>
				<object
					data={`${base}/logos/support-new/crihn.svg`}
					aria-label="Logo CRIHN"
					type="image/svg+xml"
				></object>
				<p id="crinh">
					L’Ouvroir est membre du « <em
						>Centre de recherche interuniversitaire sur les humanités numériques</em
					>
					» <a rel="external" target="_blank" href="https://www.crihn.org/">CRIHN</a>.
				</p>
			</div>

			<!-- <div class="support-logos-container">
			<a
				id="cieco-logo-container"
				href="https://cieco.umontreal.ca/"
				rel="external"
				target="_blank"
			>
				<CiecoLogo />
			</a>
			<a id="logo-crihn-container" href="https://www.crihn.org/" rel="external" target="_blank">
				<CrihnLogo />
			</a>
		</div> -->
		</section>
		<!-- <section id="credits">
			<p>Ouvroir. An inclusive and open-source space | 2023</p>
		</section> -->
	</div>
</footer>

<style>
	:global(footer) {
		--title-left-padding: 0.6rem;
	}
	footer {
		grid-column: full;
		background-color: var(--clr-b);
		display: grid;
		grid-template-columns: subgrid;
		padding: 5rem var(--gap);

		& a {
			color: var(--clr-a);
			font-weight: 200;
			text-decoration-thickness: 1px;
		}
	}

	.footer-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 3rem;
		justify-content: space-between;
	}

	section {
		color: var(--clr-a);
		/* max-width: 100%; */
		/* min-width: 20rem; */
		max-width: 40rem;

		& > *:not(h1) {
			padding-left: var(--title-left-padding);
		}
	}

	section h1 {
		width: max-content;
		font-size: var(--fs-500);
		margin-bottom: 1.8rem;
		font-weight: 700;
		color: var(--clr-b);
		background-color: var(--clr-a);
		padding: 0.7rem var(--title-left-padding);
	}

	section h2 {
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	section p {
		font-size: var(--fs-200);
		font-weight: 200;
		line-height: 1.7rem;

		& object {
			width: 7rem;
			position: inline;
		}
	}

	#about {
		flex-grow: 2;

		& div + div {
			margin-top: 1.5rem;
		}
	}

	#about div {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: start;

		& object {
			width: 7rem;
			position: inline;
		}
	}

	h1 > a > img:hover {
		cursor: pointer;
	}

	em {
		font-weight: 400;
	}

	.logos {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		column-gap: 1.5rem;
		gap: 1rem;
		padding-top: 0.3rem;
		margin-bottom: 1.5rem;
		width: 90%;

		& li a {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
		}
	}

	img {
		width: 1.5rem;
	}
</style>
