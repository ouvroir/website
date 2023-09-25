<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n/i18n';
	import { disabledNewsTypes, selectedNewsTypes } from '$lib/stores';

	/**
	 * TODO: Refactor tags on click and change
	 */

	export let selectedTags: string[] = [];
	export let tags: string[] = [];

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

	const onDocumentChange = (e: MouseEvent) => {
		if (e.target) {
			if (e.target.checked) $selectedNewsTypes.push(e.target.name);
			else $selectedNewsTypes = $selectedNewsTypes.filter((s) => s !== e.target.name);
		}
		$selectedNewsTypes = $selectedNewsTypes;
	};

	const onTagsChange = (e: MouseEvent) => {
		if (e.target) {
			if (e.target.checked) selectedTags.push(e.target.name);
			else selectedTags = selectedTags.filter((s) => s !== e.target.name);
		}
		selectedTags = selectedTags;
	};
	const documentOnClick = (e: MouseEvent) => {
		if (e.target) {
			console.log(e.currentTarget, e.currentTarget.id);
			$selectedNewsTypes.splice($selectedNewsTypes.indexOf(e.currentTarget.id), 1);
		}
		$selectedNewsTypes = $selectedNewsTypes;
	};

	const tagOnClick = (e: MouseEvent) => {
		if (e.target) {
			selectedTags.splice(selectedTags.indexOf(e.currentTarget.id), 1);
		}
		selectedTags = selectedTags;
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
				<span>FILTERS</span>
				<img src={`${base}/logos/circle-plus-solid.svg`} alt="" />
			</button>
			<ul class="selected-filters">
				{#each $selectedNewsTypes as s}
					<li class="display-li tag-doc" id={s}>
						<button on:click={documentOnClick} id={s}>
							<p>{$t(`card.${s}`)}</p>
							<img src={`${base}/logos/xmark.svg`} alt="" />
						</button>
					</li>
				{/each}
				{#if $selectedNewsTypes.length > 0 && selectedTags.length > 0}
					<li class="separator" />
				{/if}
				{#each selectedTags as s}
					<li class="display-li tag" id={s}>
						<button on:click={tagOnClick} id={s}>
							<p>{s}</p>
							<img src={`${base}/logos/xmark.svg`} alt="" />
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
													checked={$selectedNewsTypes.includes(p)}
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
							{#each tags as t}
								<li class="dropdown-li" id={t}>
									<div>
										<label for={`checkbox-${t}`}>
											<input
												type="checkbox"
												id={`checkbox-${t}`}
												name={t}
												checked={selectedTags.includes(t)}
												on:change={onTagsChange}
											/>
											{t}
										</label>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	h1 {
		font-weight: 600;
		margin-bottom: 1rem;
		border-bottom: solid 0.1rem orangered;
		width: max-content;
	}

	.filter-panel {
		grid-column: 2/-2;
		padding-bottom: var(--filter-margin);
		/* border-top: solid 0.5px black; */
		border-bottom: solid 0.5px rgba(0, 0, 0, 0.254);
		margin-top: 0.5rem;
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
		/* color: orangered; */
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.6rem 0;
	}

	.select-btn > img {
		width: 0.8rem;
		height: 0.8rem;
		margin-left: 0.5rem;
	}
	.select-btn:hover {
		cursor: pointer;
		position: relative;
		/* text-decoration: underline 3px orangered; */
	}
	.select-btn:hover::after {
		cursor: pointer;
		position: absolute;
		content: '';
		height: 0.2rem;
		background-color: orangered;
		width: 75%;
		bottom: 0.06rem;
		/* text-decoration: underline 3px orangered; */
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
		background-color: rgb(254, 254, 254);
		padding: 1.5rem;
		border: 1px solid #ddd;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}

	.dropdown > * + * {
		border-left: solid 1px #ddd;
		padding-left: 2rem;
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
		/* border-color: black; */
		padding: 0.3rem 1rem 0.3rem 0;
		width: max-content;
		/* background-color: rgba(211, 211, 211, 0.3); */
		transition: all 0.05s ease-in;
		/* font-size: 0.9rem; */
		/* font-weight: 300; */
	}

	.dropdown-li:hover {
		cursor: pointer;
		border-color: orangered;
		background-color: orangered;
		color: white;
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
		background-color: rgba(137, 43, 226, 0.115);
		padding: 0.4rem 0.6rem;
		font-size: 0.9rem;
		font-weight: 300;
		cursor: pointer;
	}

	.display-li > button {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.7rem;
	}

	.tag {
		background-color: rgba(211, 211, 211, 0.3);
	}

	.separator {
		border-left: solid 0.1rem rgba(41, 41, 41, 0.2);
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}

	input,
	label {
		cursor: pointer;
	}

	p {
		min-width: fit-content;
	}

	img {
		width: 0.6rem;
		height: min-content;
		display: block;
		box-sizing: content-box;
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
