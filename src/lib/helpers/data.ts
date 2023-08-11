
async function getBlogFiles(lang: string) {
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
async function getTeamFiles(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/equipe/*-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/equipe/*-en.md`)
    return paths
}
async function getProjectFiles(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/projets/*-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/projets/*-en.md`)
    return paths
}
async function getCrFiles(lang: string) {
    return await import.meta.glob(`$lib/labouvroir/cr/*.md`)
}
async function getSupportFiles(lang: string) {
    let paths
    lang === 'fr'
        ? paths = await import.meta.glob(`$lib/labouvroir/lab/financement-fr.md`)
        : paths = await import.meta.glob(`$lib/labouvroir/lab/financement-en.md`)
    return paths
}
async function getAboutFiles(lang: string) {
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

const setup = {
    'projects': getProjectFiles,
    'blog': getBlogFiles,
    'team': getTeamFiles,
    'meeting': getCrFiles,
    'support': getSupportFiles,
    'event': getEventFiles,
    'about': getAboutFiles,
    'coc': getCocFiles,
    'services-presentation': getServicesPresentation,
    'services-equip': getSevicesEquip,
    'services-reservation': getServicesReservation,
    'services-meet': getServicesMeet,
}

export async function fetchData(lang: string, type: keyof typeof setup) {
    const iteralbleFiles = Object.entries(await setup[type](lang))

    return await Promise.all(
        iteralbleFiles
            .filter(([path]) => !path.includes('template'))
            .map(async ([path, resolver]) => {
                const doc = await resolver()
                return {
                    meta: doc.metadata,
                    path: path,
                    html: doc.default.render().html
                }
            })
    )
}

