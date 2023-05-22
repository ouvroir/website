export const load = async () => {
    try {
        const project = await import('./test.md')
        return {
            ...project.metadata,
            ...project.default.render()
        }
    }
    catch {
        console.log('hello')
    }
}