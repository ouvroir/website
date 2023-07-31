import { fetchData } from "$lib/helpers/data"


export const load = async (event) => {

    let file
    if (event.params.slug === 'rencontres' || event.params.slug === 'meetups')
        file = await fetchData(event.locals.lang, 'services-meet')
    else if (event.params.slug === 'equipement' || event.params.slug === 'equipements')
        file = await fetchData(event.locals.lang, 'services-equip')
    else if (event.params.slug === 'reservation')
        file = await fetchData(event.locals.lang, 'services-reservation')
    else if (event.params.slug === 'presentation')
        file = await fetchData(event.locals.lang, 'services-presentation')


    return {
        html: file ? file[0].html : '',
    }
}