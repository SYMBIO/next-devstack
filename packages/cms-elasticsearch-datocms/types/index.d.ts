import { Search } from '@elastic/elasticsearch/api/requestParams';
import { FindParams } from '@symbio/cms';
import { ElasticProvider, SingletonElasticProvider } from '../providers/index';

export interface GetBodyProps {
    size?: number;
    from?: number;
    sort?: Record<string, string> | Array<Record<string, string>>;
    _source?: string[];
    filter?: Record<string, any>;
}

export interface SearchProps extends GetBodyProps {
    locale?: string;
    preview?: boolean;
}

export interface IndexingResultItem {
    type: string;
    locale?: string;
    id: string;
}

export type ElasticFindParams = FindParams & Search;

export type ElasticType<T> = {
    took: number;
    timed_out: false;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number;
        hits: {
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
        }[];
    };
    status: number;
};

export type AggregatedType<T> = {
    took: number;
    timed_out: false;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: null;
        hits: [];
    };
    aggregations: {
        [T: string]: {
            doc_count_error_upper_bound: number;
            sum_other_doc_count: number;
            buckets: {
                key: string;
                doc_count: number;
                key_as_string?: string;
            }[];
        };
    };
    status: 200;
};

export { ElasticProvider, SingletonElasticProvider };
