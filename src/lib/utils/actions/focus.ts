
// Code from https://github.com/sveltejs/site-kit/blob/12fdd45d53f112c8fcc5ff754b23b549d404aeb1/packages/site-kit/src/lib/actions/focus.js

export function focusable_children(node: HTMLElement) {
	const nodes = Array.from(
		node.querySelectorAll(
			// 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
			'[tabindex]:not([tabindex="-1"])'
		)
	);

	const index = nodes.indexOf(document.activeElement);

	const update = (d) => {
		let i = index + d;
		i += nodes.length;
		i %= nodes.length;

		// @ts-expect-error
		nodes[i].focus();
	};

	return {
		next: (selector?: string) => {
			const reordered = [...nodes.slice(index + 1), ...nodes.slice(0, index + 1)];

			for (let i = 0; i < reordered.length; i += 1) {
				if (!selector || reordered[i].matches(selector)) {
					reordered[i].focus();
					return;
				}
			}
		},
		prev: (selector?: string) => {
			const reordered = [...nodes.slice(index + 1), ...nodes.slice(0, index + 1)];

			for (let i = reordered.length - 2; i >= 0; i -= 1) {
				if (!selector || reordered[i].matches(selector)) {
					reordered[i].focus();
					return;
				}
			}
		},
		update
	};
}

/**
 * @param {HTMLElement} node
 * @param {{ reset_focus?: boolean }} opts
 */
export function trap(node, { reset_focus = true } = {}) {
	const previous = /** @type HTMLElement} */ (document.activeElement);

	const handle_keydown = (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();

			const group = focusable_children(node);
			if (e.shiftKey) {
				group.prev();
			} else {
				group.next();
			}
		}
	};

	node.addEventListener('keydown', handle_keydown);

	return {
		destroy: () => {
			node.removeEventListener('keydown', handle_keydown);
			if (reset_focus) {
				previous?.focus({ preventScroll: true });
			}
		}
	};
}
