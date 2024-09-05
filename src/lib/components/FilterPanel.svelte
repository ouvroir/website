<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { type Writable, writable, type Readable } from 'svelte/store';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n/i18n';

	const { selectedDocTypes, tags, selectedTags, selectableTags } = getContext('types') as Record<
		string,
		Writable<string[]> | Readable<string>
	>;

	/**
	 * TODO: Refactor tags on click and change
	 */
	const isOpen = writable(false);

	const filterOnClick = () => ($isOpen = !$isOpen);

	let showFilters = false;
	setTimeout(() => (showFilters = true), 50);

	const documentTypes = $page.route.id?.includes('news') ? ['event', 'blog', 'meeting'] : [];

	const handleClickOutside = (e: MouseEvent) => {
		const menu = document.getElementById('dropdown');
		const btn = document.getElementById('select-btn');
		if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
			$isOpen = false;
		}
	};

	const onDocumentChange = (e) => {
		if (e.target) {
			if (e.target.checked) $selectedDocTypes.push(e.target.name);
			else $selectedDocTypes = $selectedDocTypes.filter((s) => s !== e.target.name);
		}
		$selectedDocTypes = $selectedDocTypes;
	};

	const onTagsChange = (e: MouseEvent) => {
		if (e.target) {
			if (e.target.checked) $selectedTags.push(e.target.name);
			else $selectedTags = $selectedTags.filter((s) => s !== e.target.name);
		}
		$selectedTags = $selectedTags;
	};
	const documentOnClick = (e: MouseEvent) => {
		if (e.currentTarget) {
			$selectedDocTypes.splice($selectedDocTypes.indexOf(e.currentTarget.id), 1);
		}
		$selectedDocTypes = $selectedDocTypes;
	};

	const tagOnClick = (e: MouseEvent) => {
		if (e.currentTarget) {
			$selectedTags.splice($selectedTags.indexOf(e.currentTarget.id), 1);
		}
		$selectedTags = $selectedTags;
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			// Cleanup the event listener when the component is unmounted
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<section class="filter-panel">
	<div class="filter-container">
		<div class="filter-display">
			<button class="select-btn" id="select-btn" on:click={filterOnClick}>
				FILTERS
				<i class="bx bx-plus-circle"></i>
			</button>
			<ul class="selected-filters">
				{#each $selectedDocTypes as s}
					<li class="display-li tag-doc" id={s}>
						<button on:click={documentOnClick} id={s}>
							<p>{$t(`card.${s}`)}</p>
							<i class="bx bx-x"></i>
						</button>
					</li>
				{/each}
				{#if $selectedDocTypes.length > 0 && $selectedTags.length > 0}
					<li class="separator" />
				{/if}
				{#each $selectedTags as s}
					<li class="display-li tag" id={s}>
						<button on:click={tagOnClick} id={s}>
							<p>{s}</p>
							<i class="bx bx-x"></i>
						</button>
					</li>
				{/each}
			</ul>
		</div>
		{#if $isOpen}
			<div class="dropdown-wrapper">
				<div id="dropdown" class="dropdown">
					{#if documentTypes.length > 0}
						<div class="filter-section">
							<h1>Documents</h1>
							<ul class="dropdown-list">
								{#each documentTypes as p}
									<li class="dropdown-li" id={p}>
										<div>
											<label for={`checkbox-${p}`}>
												<input
													type="checkbox"
													id={`checkbox-${p}`}
													name={p}
													checked={$selectedDocTypes.includes(p)}
													on:change={onDocumentChange}
												/>
												{$t(`card.${p}`)}
											</label>
										</div>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					<div class="filter-section">
						<h1>Thématiques</h1>
						<ul class="dropdown-list">
							{#if $tags}
								{#each $tags as t}
									<li class="dropdown-li" id={t}>
										<div>
											<label for={`checkbox-${t}`}>
												<input
													type="checkbox"
													id={`checkbox-${t}`}
													name={t}
													checked={$selectedTags.includes(t)}
													disabled={!$selectableTags.includes(t)}
													on:change={onTagsChange}
												/>
												{t}
											</label>
										</div>
									</li>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.filter-panel {
		grid-column: popout;
		/* grid-column: feature; */
		/* border-top: solid 0.5px black; */
		margin: 5rem 0;
	}

	.filter-container {
		position: relative;
	}

	.filter-display {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 3rem;
	}

	.select-btn {
		all: unset;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.6rem 0;
		font-size: var(--fs-300);
		font-weight: 700;
	}

	.select-btn > i {
		margin-left: 0.5rem;
	}
	.select-btn:hover {
		cursor: pointer;
		position: relative;
	}
	.select-btn:hover::after {
		cursor: pointer;
		position: absolute;
		content: '';
		height: 0.2rem;
		background-color: var(--clr-accent);
		width: 75%;
		bottom: 0.06rem;
	}

	.dropdown-wrapper {
		position: relative;
		top: 0;
		left: 0;
		width: fit-content;
	}

	.dropdown {
		position: absolute;
		top: 3rem;
		left: 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: max-content;
		gap: 2rem;
		background-color: var(--cb);
		color: var(--ca);
		padding: 1.5rem;
		border-radius: var(--border-radius);
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}

	.dropdown > * + * {
		/* border-left: solid 1px #ddd; */
		padding-left: 2rem;
	}

	.filter-section h1 {
		font-size: var(--fs-300);
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.dropdown-list {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(10, auto);
		gap: 0.3rem;
	}

	.dropdown-li {
		/* text-transform: uppercase; */
		/* border: solid 0.25rem black; */
		padding: 0.3rem 1rem 0.3rem 0;
		width: max-content;
		/* background-color: rgba(211, 211, 211, 0.3); */
		transition: all 0.05s ease-in;
		/* font-size: 0.9rem; */
		/* font-weight: 300; */
	}

	.dropdown-li:hover {
		cursor: pointer;
		border-color: var(--clr-accent);
		background-color: var(--clr-accent);
	}

	.selected-filters {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.display-li {
		all: unset;
		height: fit-content;
		background-color: var(--clr-b);
		color: var(--clr-a);
		padding: 0.6rem 0.8rem;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		border-radius: var(--border-radius);
	}

	.display-li > button {
		all: unset;
		max-height: 1.5rem;
		position: static;
		display: flex;
		height: min-content;
		flex-direction: row;
		align-items: center;
		gap: 0.7rem;
	}

	.tag {
		background-color: var(--ca);
		color: var(--cb);
		border: solid 0.1rem var(--cb);
	}

	.separator {
		border-left: solid 0.2rem var(--cb);
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}

	input {
		width: 1rem;
		height: 1rem;
		background-color: var(--ca); /* Background color for the checkbox */
		cursor: pointer;
	}
	input[type='checkbox']:checked {
		background-color: var(--cb);
	}

	input,
	label {
		cursor: pointer;
	}

	label:has(input[type='checkbox']:disabled) {
		/* Styles for the label of the disabled checkbox */
		color: #888; /* Makes the text color gray */
	}

	p {
		min-width: fit-content;
	}

	/** All touch screens */
	@media screen and (max-width: 1024px) {
		.filter-panel {
			grid-column: 1/-1;
		}
	}

	/** Tablet horizontal */
	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.filter-panel {
			grid-column: 1/-1;
		}
	}

	/** Mobile */
	@media screen and (max-width: 480px) {
		.filter-panel {
			padding-bottom: 1rem;
		}
		.filter-display {
			flex-direction: column;
			gap: 1rem;
		}

		.selected-filters {
			row-gap: 1rem;
		}

		.selected-filters {
			height: max-content;
		}

		.dropdown-wrapper {
			position: static;
		}
		.dropdown {
			/* top: -1rem; */
			left: -4.5%;
			width: 101vw;
			background-color: #303030f7;
			color: white;
			border: none;
			flex-direction: column;
		}

		.dropdown > * + * {
			padding-left: 0;
			border-left: none;
		}
	}
</style>
