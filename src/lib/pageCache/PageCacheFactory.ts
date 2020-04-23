import symbio from '../../../symbio.config';
import { AbstractPageCache } from './AbstractPageCache';
import { MemoryCache } from './MemoryCache';
import { NoCache } from './NoCache';
import { RedisCache } from './RedisCache';

export class PageCacheFactory {
    static get(type = symbio.pageCache): AbstractPageCache {
        switch (type) {
            case 'redis':
                return new RedisCache();
            case 'memory':
                return new MemoryCache();
            default:
                return new NoCache();
        }
    }
}
