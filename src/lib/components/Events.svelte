<script lang="ts">
    // TODO: Best to use ical
    // https://github.com/kewisch/ical.js 

    import type { Event } from "$lib/types/Event";
	import { locale } from "$lib/i18n/i18n";
    
    export let events: Array<Event>;

    console.log(events[1])

</script>

<div class="event-grid">
    {#each events as e}
        <div class="event-card">
            <p class='event-card-title'><strong>{e.summary}</strong></p>
            <p><i>{e.dtstart.toLocaleString($locale)}</i></p>
            <p class='event-card-description'>{@html e.description}</p>
            <a href={e.url} rel="external">S'inscrire à l'événement</a>
        </div>
    {/each}
</div>

<style>
    .event-grid {
        margin: auto;
        width: 80vw;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5em
    }

    .event-card {
        background-color: rgba(238, 238, 238, 0.3);
        border: 1px solid lightgray;
        border-radius: 6px;
        padding: 1.5rem;
    }

    .event-card-description {
        max-height: 20vh;
        overflow: hidden;
    }

</style>