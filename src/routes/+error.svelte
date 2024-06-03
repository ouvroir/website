<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1>
    {#if $page.error }
        {$page.error.message}
    {:else}
        Error
    {/if}
</h1>