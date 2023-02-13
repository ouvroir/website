<script lang="ts">
    import type { PageData } from './$types';
    import Events from '$lib/components/Events.svelte';
    import { t } from '$lib/i18n/i18n'

    export let data: PageData

    console.log(data)
</script>

<h1>{$t('events.title')}</h1>

<Events events={data.events} />