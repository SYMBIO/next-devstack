import { Menu } from './menu';
import { FormErrors } from './forms';
import { MyPageProps, Page } from './page';
import { Environment } from 'relay-runtime';

export interface AppContextProps extends MyPageProps {
    readonly mainMenu?: Menu;
    readonly formErrors?: FormErrors;
    readonly environment?: Environment;
    readonly currentUri?: string;
    readonly currentUrl?: string;
    readonly absoluteLinks?: boolean;
    readonly newsPage?: Page;
}
