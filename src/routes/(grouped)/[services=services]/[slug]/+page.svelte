<script lang="ts">
	export let data;
</script>

<article>
	{@html data.html}
</article>

<style>
	article {
		grid-column: 3/7;
	}
</style>
