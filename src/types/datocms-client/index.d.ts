/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'datocms-client' {
    class Records {
        all(params: any, options?: any): Promise<any>;
        find(itemId: string, options?: any): Promise<any>;
        create(params: any): Promise<any>;
        update(id: string | undefined, params: any): Promise<any>;
        publish(itemId: string, options?: any): Promise<any>;
        unpublish(itemId: string, options?: any): Promise<any>;
        batchPublish(params: any): Promise<any>;
        destroy(itemId: string): Promise<any>;
    }

    class Uploads {
        all(options: any): Promise<any>;
        find(id: string): Promise<any>;
        create(params: any): Promise<any>;
        update(id: string | undefined, params: any): Promise<any>;
    }

    export class SiteClient {
        readonly items: Records;
        readonly uploads: Uploads;
        createUploadPath(url: string);
        readonly uploadRequest: Uploads;

        constructor(token: string);
    }

    export function buildModularBlock(unserializedBody);
}

declare module 'datocms-client/lib/upload/adapters/node' {
    export default rawUploadFile();
}
