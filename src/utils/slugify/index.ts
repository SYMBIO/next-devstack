import origSlugify from 'slugify';

export default function slugify(str: string): string {
    return origSlugify(str, { remove: /[^\w\s-]/g, lower: true });
}
