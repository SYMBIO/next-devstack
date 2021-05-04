export default function getSlug(slug: string | string[]): string | undefined {
    const last = Array.isArray(slug) ? slug[slug.length - 1] : slug;

    return last;
}
