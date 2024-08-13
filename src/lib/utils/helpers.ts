import type { Blog, Event, Meeting, Member, Project, Resource } from "$lib/types";

export function sortContentByDate(a: Blog | Event | Meeting, b: Blog | Event | Meeting) {
    const aDate = new Date(a.meta.kind === 'event' ? a.meta.dateStart : a.meta.date);
    const bDate = new Date(b.meta.kind === 'event' ? b.meta.dateStart : b.meta.date);
    return bDate.getTime() - aDate.getTime();
}

export function getTagsfromContent<T extends Blog | Member | Meeting | Project | Resource | Event>(content: T[]) {
    return Array.from(
        content.reduce((acc, p) => {
            if (p.meta.tags) {
                p.meta.tags.forEach((t) => acc.add(t));
            }
            return acc;
        }, new Set())
    ) as string[]
}

export function contentHasTags<T extends Blog | Member | Meeting | Project | Resource | Event>(content: T, tags: string[]) {
    if (tags.length === 0) return true;
    if (!('tags' in content.meta)) return false;

    // console.log(content.meta.tags.some((t) => tags.includes(t)), tags, content.meta.tags)
    return content.meta.tags.some((t) => tags.includes(t));
}

export function getDateFromContent(content: Blog | Event | Resource): Date {
    switch (content.meta.kind) {
        case 'event':
            return new Date(content.meta.dateStart);
        case 'blog':
            return new Date(content.meta.date);
        case 'resource':
            return new Date(content.meta.dateCreated);
        default:
            return new Date();
    }
};