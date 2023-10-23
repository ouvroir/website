
import type { OuvroirData, ProjectMeta, MemberMeta, EventMeta, MeetingMeta, BlogMeta } from "$lib/types"

const getBlogs = async () =>
    await import.meta.glob(`$lib/labouvroir/blog/*.md`)

const getEvents = async () =>
    await import.meta.glob(`$lib/labouvroir/evenements/*.md`)

const getCr = async () =>
    await import.meta.glob(`$lib/labouvroir/cr/*.md`)

const getTeam = async () =>
    await import.meta.glob(`$lib/labouvroir/equipe/*.md`)

const getProjects = async () =>
    await import.meta.glob(`$lib/labouvroir/projets/*.md`)

const getSupportFiles = async () =>
    await import.meta.glob(`$lib/labouvroir/lab/financement-*.md`)

const getAbout = async () =>
    await import.meta.glob(`$lib/labouvroir/about-*.md`)

const getServices = async () =>
    await import.meta.glob(`$lib/labouvroir/lab/services-*.md`)

export const setup = {
    'projects': getProjects,
    'blog': getBlogs,
    'team': getTeam,
    'meeting': getCr,
    'support': getSupportFiles,
    'event': getEvents,
    'about': getAbout,
    'services': getServices,
}

export async function fetchData(type: keyof typeof setup) {

    const iteralbleFiles = Object.entries(await setup[type]())

    const mdFiles = await Promise.all(
        iteralbleFiles
            .filter(([path]) => !path.includes('template'))
            .map(async ([path, resolver]) => {
                const md = await resolver()
                let meta: ProjectMeta | MemberMeta | EventMeta | undefined;

                if (type === 'projects') {
                    meta = { ...md.metadata, path, kind: 'project' } as ProjectMeta;
                }
                else if (type === 'team') {
                    meta = { ...md.metadata, path, kind: 'member' } as MemberMeta;
                }
                else if (type === 'event') {
                    meta = { ...md.metadata, path, kind: 'event' } as EventMeta;
                }
                else if (type === 'meeting') {
                    meta = { ...md.metadata, path, kind: 'meeting' } as EventMeta;
                }
                else if (type === 'blog') {
                    meta = { ...md.metadata, path, kind: 'blog' } as BlogMeta;
                }
                else {
                    meta = { ...md.metadata, path, kind: 'other' }
                }


                let mdHtml = md.default.render().html

                mdHtml = mdHtml.replace(/<a /g, "<a target='_blank' rel='external'")

                return {
                    meta,
                    html: mdHtml,
                } as OuvroirData
            })
    )

    // Only filters contents that are not drafts
    // Contents needs to have meta otherwise it will be NOT be filtered out
    return mdFiles.filter(md => {
        if (!md.meta) return true
        if ('draft' in md.meta)
            return !md.meta.draft
        return true
    })

}

export function createSlugFromFilename(filename: string) {
    filename = filename.split('/').at(-1)!
    return encodeURIComponent(filename.replace('.md', ''))
}
