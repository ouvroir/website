<script lang="ts">
	import { t } from '$i18n/i18n';
	import { page } from '$app/stores';

	let presentation: string;
	$: presentation = $page.data.html;
</script>

<!-- <h1>{$t('about.title')}</h1> -->

{@html presentation}
