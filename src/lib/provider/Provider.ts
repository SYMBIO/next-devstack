export interface FindResponse<T = any> {
    count: number;
    data: T[];
}

export default interface Provider {
    /**
     * Get API key of the model this provider is bound to
     */
    getApiKey: () => string;

    /**
     * Get ID of the model this provider is bound to
     */
    getId: () => string;

    /**
     * Get list of items based on passed criteria
     * @param options
     */
    find: (options: any) => Promise<FindResponse>;

    /**
     * Get one item by id
     * @param id
     * @param locale
     */
    findOne: (id: string, locale: string) => Promise<any>;
}
