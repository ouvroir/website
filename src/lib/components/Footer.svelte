<script lang="ts">
	import { base } from '$app/paths';
	import { t } from '$i18n/i18n';
	import { Cieco, Crihn } from '$components';
	import { Github, Twitter, Hypothesis, Matrix, Zotero } from '$components';
</script>

<footer class="content">
	<div class="footer-content">
		<section id="contact">
			<h1>{$t('footer.find')}</h1>
			<div class="adress">
				<p>Université de Montréal</p>
				<p>Pavillon Lionel-Groulx, local C-8132</p>
				<p>3150 rue Jean-Brillant, Montréal H3T 1N8</p>
			</div>
			<h2>{$t('footer.contact')}</h2>
			<a href="mailto:ouvroir@umontreal.ca">ouvroir@umontreal.ca</a>
		</section>

		<section id="follow">
			<h1>{$t('footer.follow')}</h1>
			<ul class="logos">
				<li>
					<i class="bx bxl-github"></i>
					<a href="https://github.com/ouvroir" rel="external" target="_blank"> Github</a>
				</li>
				<li>
					<i class="bx bxl-twitter"></i>
					<a href="https://twitter.com/labouvroir" rel="external" target="_blank"> Twitter</a>
				</li>
				<li>
					<i class="ai ai-hypothesis ai-2x"></i>
					<a href="https://hypothes.is/groups/pM5dq7b4/ouvroir" rel="external" target="_blank">
						Hypothesis</a
					>
				</li>
				<li>
					<Matrix />
					<a
						href="https://matrix.to/#/!AaxspHhzNUgFJpDKTr:matrix.org?via=matrix.org"
						rel="external"
						target="_blank">Matrix</a
					>
				</li>
				<!-- <li>
					<a href="https://mobilizon.fr/@ouvroir_lab" rel="external" target="_blank"
						>
					<object type="image/svg+xùm" data={`${base}/logos/brands/mobilizon.svg`} title="Logo Mobilizon">Logo Mobilizon</object>
					Mobilizon</a
					>
				</li> -->
				<li>
					<i class="ai ai-zotero ai-2x"></i>
					<a href="https://www.zotero.org/groups/2480242/ouvroir" rel="external" target="_blank">
						Zotero</a
					>
				</li>
			</ul>
		</section>

		<section id="about">
			<h1>{$t('footer.about')}</h1>

			<div>
				<p>{@html $t('footer.cieco')}</p>
			</div>

			<div>
				<p id="crinh">{@html $t('footer.crihn')}</p>
			</div>
		</section>
	</div>
</footer>

<style>
	:global(footer) {
		--title-left-padding: 0.6rem;
	}
	footer {
		background-color: var(--clr-b);
		padding: var(--content-bottom-padding) 0;

		& a {
			color: var(--clr-a);
			font-weight: 400;
			font-size: var(--fs-300);
			text-decoration-thickness: 1px;
		}
	}

	.footer-content {
		max-width: 100%;
		grid-column: feature;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 4rem;
		/* justify-content: space-between; */
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
		font-size: var(--fs-300);
		font-weight: 400;
		line-height: 1.7rem;

		& object {
			width: 7rem;
			position: inline;
		}
	}

	#follow {
		& li {
			display: flex;
			flex-direction: row;
			gap: 2rem;
			align-items: center;
		}
		& i {
			font-size: 2rem;
			width: 2rem;
		}

		& svg {
			min-width: 2rem;
		}
	}
	#about {
		flex-grow: 1;
		max-width: 60ch;

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

	.logos {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		column-gap: 1.5rem;
		gap: 1rem;
		padding-top: 0.3rem;
		margin-bottom: 1.5rem;
		width: 90%;

		& li {
			height: 2rem;
			display: flex;
			flex-direction: row;
			justify-items: center;
		}

		& li a {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
		}
	}
</style>
