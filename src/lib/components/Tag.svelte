<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$i18n/i18n';

	export let tag: string;
	export let contrast: 'a' | 'b' = 'a';
	export let closeIcon: boolean = false;
	export let size: 's' | 'm' | 'l' = 'm';
	export let i18n: boolean = true;
	export let alt: boolean = false;
	export let onClick: (e: MouseEvent) => void = () => {};

	$: alternative = alt ? `${contrast}-alt` : '';
</script>

<button class={`tag ${contrast} ${alternative} ${size}`} on:click={onClick} id={tag}>
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
		--border-width: 2px;

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
	.a-alt {
		border-color: var(--ca);
	}

	.b {
		background-color: var(--cb);
		border-color: var(--cb);
		color: var(--ca);
	}
	.b-alt {
		border-color: var(--ca);
	}

	/* Tag sizes */
	.s {
		padding: 0.4rem 0.6rem;
		font-size: var(--fs-100);
	}

	.m {
		padding: calc(0.6rem - var(--border-width)) calc(0.8rem - var(--border-width));
		font-size: var(--fs-200);
	}
</style>
