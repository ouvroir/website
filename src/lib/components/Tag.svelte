<script lang="ts">
	import { t } from '$i18n/i18n';

	export let tag: string;
	export let contrast: 'a' | 'b' = 'a';
	export let closeIcon: boolean = false;
	export let size: 's' | 'm' | 'l' = 'm';
	export let i18n: boolean = true;
	export let onClick: (e: MouseEvent) => void = () => {};
</script>

<button class={`tag ${contrast} ${size}`} on:click={onClick} id={tag}>
	<p>
		{#if i18n}
			{$t(`card.${tag}`)}
		{:else}
			{tag}
		{/if}
	</p>
	{#if closeIcon}
		<i class="bx bx-x"></i>
	{/if}
</button>

<style>
	.tag {
		--ca: var(--clr-a);
		--cb: var(--clr-b);

		all: unset;
		display: flex;
		flex-direction: row;
		gap: 0.7rem;
		align-items: center;

		width: fit-content;
		height: fit-content;

		font-weight: 500;
		cursor: pointer;
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 2px;
	}

	p {
		width: max-content;
	}

	/* Tag contrasts */
	.a {
		background-color: var(--ca);
		border-color: var(--cb);
		color: var(--cb);
	}
	.b {
		background-color: var(--cb);
		border-color: var(--cbt);
		color: var(--ca);
	}

	/* Tag sizes */
	.s {
		padding: 0.4rem 0.6rem;
		font-size: var(--fs-100);
	}

	.m {
		padding: 0.6rem 0.8rem;
		font-size: var(--fs-200);
	}
</style>
