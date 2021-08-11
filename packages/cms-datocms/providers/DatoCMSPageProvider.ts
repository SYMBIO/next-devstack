import { AbstractPageProvider } from '@symbio/cms';
import { FindOperationType, OneOperationType } from '../types';

export default class DatoCMSPageProvider<
    TOne extends OneOperationType,
    TFind extends FindOperationType
> extends AbstractPageProvider {}
