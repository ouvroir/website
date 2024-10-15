import { get } from "svelte/store";
import type { Blog, Event, Meeting, Member, Project, Resource } from "$lib/types";
import { membersHash } from '$lib/stores'


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

export function extractContentFromHTML(html: string, pattern: string[]) {
    const parser = new DOMParser();

    let doc = parser.parseFromString(html, 'text/html');
    let extracts: string[] = []

    if (Array.isArray(pattern)) {
        pattern.forEach(p => {
            const extracted = doc.querySelector(p);
            if (extracted) {
                extracted.remove();
                extracts.push(extracted.innerHTML);
            }
        })
    }

    return { extracts, doc: doc.body.innerHTML };

}

export function getFirstParagraph(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('p');
}

export function getH1fromHTML(html: string): { heading: string; doc: string } {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const heading = doc.querySelector('h1');
    let res
    if (heading) {
        heading.remove();
        res = { heading: heading.innerHTML, doc: doc.body.innerHTML };
    } else {
        res = { heading: 'undefined', doc: 'undefined' };
    }
    return res
}

/**
 * Finds a member from $memberHash
 */
export function findMember(username: string): string {
    const m = get(membersHash).find(m => m.username === username)

    if (!m) {
        console.warn('[helpers.findMember] No member founds.')
        return username
    }
    return m.name
}


export function wrapContentBetweenH2s(node: HTMLElement) {
    const h2Elements = node.querySelectorAll('h2');
    const article = node;

    h2Elements.forEach((h2, index) => {
        const nextH2 = h2Elements[index + 1];
        const div = document.createElement('div');
        const section = document.createElement('section');
        div.classList.add('section-content', 'closed');

        let sibling = h2.nextElementSibling;
        while (sibling && sibling !== nextH2) {
            const nextSibling = sibling.nextElementSibling;
            div.appendChild(sibling);
            sibling = nextSibling;
        }

        const headerBtn = document.createElement('button');
        const btnIcon = document.createElement('i');
        headerBtn.classList.add('section-header');
        btnIcon.classList.add('bx', 'bx-plus');
        headerBtn.addEventListener('click', () => {
            div.classList.toggle('closed');
            div.classList.toggle('opened');

            document.querySelectorAll('.section-content').forEach((section) => {
                if (section !== div) {
                    section.classList.remove('opened');
                    section.classList.add('closed');
                }
            });

            btnIcon.classList.toggle('bx-plus');
            btnIcon.classList.toggle('bx-minus');

            if (div.classList.contains('opened')) {
                scrollToElementWithOffset(section, -48);
            }
        });

        headerBtn.appendChild(h2);
        headerBtn.appendChild(btnIcon);

        section.appendChild(headerBtn);
        section.appendChild(div);

        article.insertBefore(section, nextH2);
    });
}

export function generateSlug(str: string | undefined): string {
    if (!str) return ''
    return str.replace(/\s+/g, '-').toLowerCase();
}

export function generateViewBox(width: number, height: number, zoom: number = 1) {
    return `${(width - width / zoom) / 2} ${(height - height / zoom) / 2} ${width / zoom} ${height / zoom}`
}