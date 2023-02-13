import type { PageLoad } from './$types';
import ICalParser from 'ical-js-parser';
import { parseUtcDate } from '$lib/helpers/icalRegex';

export const load = (async ({ fetch }) => {
    const now = new Date(Date.now())

    return {
        events: await fetch('https://mobilizon.fr/@ouvroir_lab/feed/ics')
            .then(res => res.text())
            .then(data => {
                const parsed = ICalParser.toJSON(data).events
                let events: Array<Event> = Object.keys(parsed).map(i => ({
                    ...parsed[i],
                    dtstart: parseUtcDate(parsed[i].dtstart.value),
                    dtstamp: parseUtcDate(parsed[i].dtstamp.value),
                    dtend: parseUtcDate(parsed[i].dtend.value),
                }))

                // Show only events to come
                events = events.filter(e => e.dtstart.getTime() >= now.getTime() )
                return events
            })
    };
}) satisfies PageLoad

