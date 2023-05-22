<script lang="ts">
	import { t } from '$i18n/i18n';
	import { page } from '$app/stores';

	let presentation: string;
	$: presentation = $page.data.html;
</script>

<div class="aside">
	<h3>{$t('snav.title')}</h3>
	<ul class="nav-secondary">
		<li><a href={`/${$t('route.about.presentation')}`}>{$t('snav.presentation')}</a></li>
		<li><a href={`/${$t('route.about.team')}`}>{$t('snav.team')}</a></li>
		<li><a href={`/${$t('route.about.coc')}`}>{$t('snav.coc')}</a></li>
	</ul>
</div>

<div class="content">
	<article>
		{@html presentation}
	</article>
</div>

<style>
	h3 {
		font-size: var(--fs-secnav-title);
		font-weight: 300;
		margin-bottom: var(--padding-m);
		border-bottom: solid 0.2rem hotpink;
		padding-bottom: 0.4rem;
	}

	.nav-secondary {
		display: flex;
		flex-direction: column;
		gap: var(--padding-m);
		font-family: var(--ff-mono);
	}

	.content {
		grid-column: 6/17;
	}
</style>
