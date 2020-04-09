import { Menu } from './menu';
import { FormErrors } from './forms';

export interface WebSettings {
    readonly webSettings?: {
        readonly mainMenu: Menu;
        readonly formErrors: FormErrors;
    };
}
