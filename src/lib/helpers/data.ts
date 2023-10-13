
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

const setup = {
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
                let mdHtml = md.default.render().html
                mdHtml = mdHtml.replace(/<a /g, "<a target='_blank' rel='external'")
                return {
                    meta: md.metadata,
                    path: path,
                    html: mdHtml,
                }
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
