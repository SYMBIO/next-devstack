import { Page } from './page';

export interface Menu {
    readonly links: Page[];
}

export interface Newsletter {
    readonly __typename: string;
    readonly title?: string;
    readonly emailInput?: string;
    readonly description?: string;
    readonly buttonText?: string;
}

export interface MenuFooterContact {
    readonly __typename: string;
    readonly openingHours?: string;
    readonly contact?: string;
    readonly url?: Page;
}

export interface MenuFooter extends Newsletter, MenuFooterContact {}
