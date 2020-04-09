import { FormErrors } from './forms';
import { MenuRecord, PageRecord } from './graphql';
import { MyPageProps } from './page';
import { Environment } from 'relay-runtime';

export interface AppContextProps extends MyPageProps {
    readonly mainMenu?: MenuRecord;
    readonly formErrors?: FormErrors;
    readonly environment?: Environment;
    readonly currentUri?: string;
    readonly currentUrl?: string;
    readonly absoluteLinks?: boolean;
    readonly newsPage?: PageRecord;
}
