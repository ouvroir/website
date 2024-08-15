

export function getRandomPattern(): string {
    const nbPatterns = 3; //nb patterns in styles/patterns.css
    const random = Math.floor(Math.random() * nbPatterns) + 1;
    return `pattern-${random}`;
}