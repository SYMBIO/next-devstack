export default function isStaging(): boolean {
    return process.env.DATOCMS_ENDPOINT?.substr(-7) === 'preview';
}
