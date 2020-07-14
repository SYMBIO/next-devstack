import { ParsedUrlQuery } from 'querystring';

export interface FindResponse {
    count: number;
    data: any[];
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

    /**
     * Get static path parts which should be generated for this model. Based on {@link https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation|NextJS}
     * @param locale
     */
    getStaticPaths: (locale: string) => Promise<ParsedUrlQuery[]>;
}
