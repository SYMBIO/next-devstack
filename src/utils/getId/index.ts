export default function getId(slug: string | string[]): string | undefined {
    const last = Array.isArray(slug) ? slug.pop() : slug;

    if (!last) {
        return undefined;
    }

    return last.split('-').shift();
}
