import { BasePage } from '@symbio/cms';
import { AppContextProps } from '../..';

export class AppStore<P extends BasePage, W> {
    private static instance: AppStore<any, any>;

    private data: Partial<AppContextProps<P, W>>;

    private constructor() {
        this.data = {};
    }

    init(data: AppContextProps<P, W>): this {
        this.data = { ...data };
        return this;
    }

    static getInstance<P extends BasePage, W>(data?: AppContextProps<P, W>): AppStore<P, W> {
        if (!AppStore.instance) {
            AppStore.instance = new AppStore();
        }
        if (data) {
            AppStore.instance.init(data);
        }
        return AppStore.instance;
    }

    get(): Partial<AppContextProps<P, W>> {
        return this.data;
    }
}

export default AppStore;
