<script lang="ts">
	import { t } from '$i18n/i18n';
	import {
		HomeNewsSection,
		HomeCarousel,
		HomeProjectsSection,
		HomeServicesSection
	} from '$lib/components';
</script>

<svelte:head>
	<title>{$t('head.home')}</title>
</svelte:head>

<HomeNewsSection />

<HomeCarousel />

<HomeProjectsSection />

<HomeServicesSection />
