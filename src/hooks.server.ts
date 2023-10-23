import type { Handle } from '@sveltejs/kit';
import { validateAll } from '$lib/helpers/validation';

let executed = false

export const handle = (({ event, resolve }) => {

    if (!executed) {
        validateAll()
            .then(() => console.log('validation done'))
            .catch(err => console.error(err))

    }
    executed = true
    return resolve(event);
}) satisfies Handle;

