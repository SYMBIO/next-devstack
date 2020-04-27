import symbio from '../../../symbio.config';
import isStaging from '../../utils/isStaging';
import { AbstractPageCache } from './AbstractPageCache';
import { MemoryCache } from './MemoryCache';
import { NoCache } from './NoCache';
import { RedisCache } from './RedisCache';

export class PageCacheFactory {
    static get(type = symbio.pageCache): AbstractPageCache {
        switch (type) {
            case 'redis':
                if (isStaging()) {
                    return new NoCache();
                }
                return new RedisCache();
            case 'memory':
                return new MemoryCache();
            default:
                return new NoCache();
        }
    }
}
