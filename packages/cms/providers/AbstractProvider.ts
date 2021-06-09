import {
    FindParams,
    CmsItem,
    ItemId,
    Provider,
    ProviderOptions,
    CmsAttributes,
    FindResponse,
    FindOneParams,
} from '../types';

export default abstract class AbstractProvider<ItemType extends CmsItem> implements Provider {
    protected options: ProviderOptions;

    public constructor(options: ProviderOptions) {
        this.options = options;
    }

    public isLocalizable(): boolean {
        return this.options.locales.length > 1;
    }

    getApiKey(): string {
        return this.options.apiKey;
    }

    getId(): string {
        return this.options.id;
    }

    /**
     * Get one item by id or filter
     * @param options
     */
    abstract findOne(options: FindOneParams | FindParams): Promise<ItemType | null>;

    /**
     * Transform item of one query into an item
     * @param item
     * @param locale
     */
    async transformResult(item: Omit<ItemType, keyof CmsAttributes> | null, locale?: string): Promise<ItemType | null> {
        if (item) {
            return { ...item, cmsTypeId: this.getId() } as ItemType;
        } else {
            return null;
        }
    }

    abstract find(options: FindParams): Promise<FindResponse<ItemType[]>>;

    /**
     * Transform find results into array of items
     * @param items
     * @param locale
     */
    async transformResults(items: Array<Omit<ItemType, keyof CmsAttributes>>, locale?: string): Promise<ItemType[]> {
        return items.map((item) => ({ ...item, cmsTypeId: this.getId() })) as ItemType[];
    }

    /**
     * Default filter params for all CMS queries
     * @return {Record<string, unknown>}
     */
    abstract getFilterParams(): Record<string, unknown>;

    /**
     * Get url of the item
     * @param {ItemId} id
     * @param {string} locale
     * @param {string} defaultLocale
     * @return {Promise<string | null>}
     */
    async getPreviewUrl(id: ItemId, locale?: string, defaultLocale?: string): Promise<string | null> {
        const item = await this.findOne({ id, locale });
        if (locale !== defaultLocale) {
            if (item) {
                if (item.url) {
                    return `/${locale}/${item.url}`;
                }
                if (item.slug) {
                    return `/${locale}/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${locale}/${item.id}`;
                }
            }
            return null;
        } else {
            const item = await this.findOne({ id });
            if (item) {
                if (item.url) {
                    return `/${item.url}`;
                }
                if (item.slug) {
                    return `/${item.id}-${item.slug}`;
                }
                if (item.id) {
                    return `/${item.id}`;
                }
            }
            return null;
        }
    }
}
