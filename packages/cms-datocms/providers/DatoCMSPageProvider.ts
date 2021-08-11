import { AbstractPageProvider } from '@symbio/cms/dist/providers';
import { FindOperationType, OneOperationType } from '../types';

export default abstract class DatoCMSPageProvider<
    TOne extends OneOperationType,
    TFind extends FindOperationType
> extends AbstractPageProvider {}
