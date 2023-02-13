import type { Event } from "$lib/types/Event";


// TODO: function parseIcal is not working. Fix to remove ical-js-parser dependency.

const icalRegEx = /(BEGIN:VEVENT.*DTSTAMP:(\d{8}T\d{6}Z).*DTSTART:(\d{8}T\d{6}Z).*DTEND:(\d{8}T\d{6}Z).*SUMMARY:(.*)LOCATION:(.*)DESCRIPTION:(.*)UID:(.*)CREATED:(\d{8}T\d{6}Z).*LAST-MODIFIED:(\d{8}T\d{6}Z).*SEQUENCE:(\d{10}).*END:VEVENT)/gs

export function parseIcal(raw: string): Array<Event> {
    const a: Array<Event> = []
    const res = raw.matchAll(icalRegEx)
    // console.log('parse result', res)
    return a
}

export function parseUtcDate(date: string, locale): Date {
    const reg = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g
    const r = [... date.matchAll(reg)][0]
    return new Date(`${r[1]}-${r[2]}-${r[3]}T${r[4]}:${r[5]}:${r[6]}Z`)
}