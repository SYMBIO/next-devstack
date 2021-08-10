import { AppData, BasePage } from '@symbio/cms';
import { BlocksPropsMap } from './block';

export type OmitRefType<T> = Omit<T, ' $refType'>;

export interface MyPageProps<P extends BasePage, W> extends AppData<P, W> {
    hostname: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksPropsMap?: BlocksPropsMap;
    preview?: boolean;
    showGrid?: boolean;
}

export type IndexingRelations = Record<string, Record<string, Array<string>>>;

export * from '../lib/blocks';
