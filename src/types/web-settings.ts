import { MenuRecord } from './graphql';
import { FormErrors } from './forms';

export interface WebSettings {
    readonly webSettings?: {
        readonly mainMenu: MenuRecord;
        readonly formErrors: FormErrors;
    };
}
