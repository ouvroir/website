import type { ProjectMeta, MemberMeta, EventMeta, MeetingMeta, BlogMeta } from "$lib/types"
import { setup, fetchData } from "./data.ts"
import fs from 'fs'


type Generic = ProjectMeta | MemberMeta | EventMeta | MeetingMeta | BlogMeta;

export async function validateAll(): Promise<{
    path: string, brokenLinks: { metaLinks: string[], contentLinks: string[] }
}[]> {
    let logs: {
        path: string,
        brokenLinks: { metaLinks: string[], contentLinks: string[] }
    }[] = [];
    let nbFiles = 0;


    const keys = Object.keys(setup);

    for (const key of keys) {
        const data = await fetchData(key as keyof typeof setup)
        for (const d of data) {

            nbFiles += 1;
            console.log('validating', d.meta.path)

            let strAttrs: Array<string> = [];
            let linkAttrs: Array<string> = [];

            if (d.meta.kind === 'project') {
                strAttrs = ["title", "description", "lead", "since", "slug", "bannerImage", "pageImage"]
                linkAttrs = ["link"]
            } else if (d.meta.kind === 'member') {
                strAttrs = [
                    "firstname", "lastname", "username", "slug", "description", "mail",
                    "projects", "status", "pronouns", "permalink", "img"
                ]
                linkAttrs = ['link', 'permalink']
            }
            else if (d.meta.kind === 'event') {
                strAttrs = ["title", "subtitle", "place", "link", "description"]
                linkAttrs = ['link']
            }
            else if (d.meta.kind === 'meeting') {
                strAttrs = ["date"]
                linkAttrs = []
            }

            const metaLinks: string[] = d.meta.kind === 'other' ? [] : await validateMeta(d.meta, strAttrs, linkAttrs)
            const contentLinks: string[] = await validateHtmlHref(d.html)

            if ((metaLinks.length || contentLinks.length))
                logs.push({
                    path: d.meta.path,
                    brokenLinks: {
                        metaLinks: metaLinks ? [...metaLinks] : [],
                        contentLinks: contentLinks ? [...contentLinks] : []
                    }
                })
        }
    };

    logs = logs.filter(
        log => log.brokenLinks.metaLinks.length || log.brokenLinks.contentLinks.length
    )

    console.log('[ + ] validated', nbFiles, 'files\n')
    fs.writeFileSync('./src/routes/validate/logs.json', JSON.stringify(logs, null, 2))





    return logs


}


async function validateMeta<T extends Generic>(
    meta: T,
    stringAttrs: Array<keyof T & string>,
    linkAttrs: Array<keyof T & string>
): Promise<string[]> {
    const brokenLinks = [];
    for (const attr of stringAttrs) {
        const value = meta[attr] as string;
        if (typeof value === "string" && isEmptyStrOrNull(value)) {
            console.warn(`Project ${meta.slug} has empty or null ${String(attr)}`);
        }
    }

    for (const attr of linkAttrs) {
        const validHref = await isValidHref(meta[attr] as string);
        if (!validHref) {
            brokenLinks.push(meta[attr] as string)
        }
    }
    return brokenLinks
}



function isEmptyStrOrNull(s: string): boolean {
    return s === "" || s === null
}

export async function isValidHref(s: string): Promise<boolean> {
    if (isEmptyStrOrNull(s))
        return false

    if (s.includes('mailto:')) {
        return true
    }

    try {
        const response = await fetch(s, { method: 'HEAD' }); // Using HEAD to fetch headers only
        if (response.status === 200)
            return true
        else
            return false
    } catch (error) {
        // console.error("Fetch error: ", error);
        return false;
    }
}

export async function validateHtmlHref(htmlStr: string): Promise<string[]> {
    const pattern = /href="(.*?)"/g;
    const urls: string[] = [];
    const brokenUrls: string[] = [];
    let match;

    while ((match = pattern.exec(htmlStr)) !== null) {
        urls.push(match[1]); // match[1] contains the captured URL.
    }

    for (const url of urls) {
        const validHref = await isValidHref(url);
        if (!validHref)
            brokenUrls.push(url)
    }

    return brokenUrls
}