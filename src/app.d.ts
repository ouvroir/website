// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		interface Error {
			message: string;
			errorId: string;
			code: string;
		}
		interface Locals {
			lang: string
		}
		// interface Platform {}
	}
}

export { };
