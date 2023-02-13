<script lang="ts">
    import Nav from '$lib/components/Nav.svelte'
</script>


<div class='app'>
    <Nav />
    <div class='app-content'>
        <slot />
    </div>
</div>

<style>
    .app {
        width: 100%;
        height: 100%;
    }
    
    .app-content {
        padding: .5rem 1.5rem 5rem 1.5rem;
    }
</style>