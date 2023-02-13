// ICAL event
export type Event = {
    dtstamp: Date
    dtstart: Date
    dtend: Date
    summary: string
    description: string
    uid: string
    url: string
}