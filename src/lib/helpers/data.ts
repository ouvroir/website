
async function getBlogs(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/blog/*-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/blog/*-en.md`)
    return paths
}
async function getEventFiles(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/evenements/*-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/evenements/*-en.md`)
    return paths
}
async function getTeam(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/equipe/*-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/equipe/*-en.md`)
    return paths
}
async function getProjects(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/projets/*-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/projets/*-en.md`)
    return paths
}
async function getCr(lang: string) {
    return await import.meta.glob(`$lib/labouvroir/cr/*.md`)
}
async function getSupportFiles(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/financement-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/financement-en.md`)
    return paths
}
async function getAbout(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/about-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/about-en.md`)
    return paths
}
async function getCocFiles(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/codeDeConduite-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/codeDeConduite-en.md`)
    return paths
}
async function getServicesPresentation(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/services/presentation-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/services/presentation-en.md`)
    return paths
}
async function getSevicesEquip(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/services/equipements-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/services/equipements-en.md`)
    return paths
}
async function getServicesReservation(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/services/reservation-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/services/reservation-en.md`)
    return paths
}
async function getServicesMeet(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/services/rencontres-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/services/rencontres-en.md`)
    return paths
}

async function getServices(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/services-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/services-en.md`)
    return paths
}

const setup = {
    'projects': getProjects,
    'blog': getBlogs,
    'team': getTeam,
    'meeting': getCr,
    'support': getSupportFiles,
    'event': getEventFiles,
    'about': getAbout,
    'coc': getCocFiles,
    'services-presentation': getServicesPresentation,
    'services-equip': getSevicesEquip,
    'services-reservation': getServicesReservation,
    'services-meet': getServicesMeet,
    'services': getServices,
}

export async function fetchData(lang: string, type: keyof typeof setup) {
    const iteralbleFiles = Object.entries(await setup[type](lang))

    const mdFiles = await Promise.all(
        iteralbleFiles
            .filter(([path]) => !path.includes('template'))
            .map(async ([path, resolver]) => {
                const md = await resolver()
                return {
                    meta: md.metadata,
                    path: path,
                    html: md.default.render().html,
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