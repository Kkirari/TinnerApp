import { User } from "../_models/user";
import { UserQueryPagination, Paginator } from "../_models/pagination";
import { parseUserPhoto } from "./helper";

const data = new Map();
type cacheOpt = 'members' | 'chat' | 'follower' | 'following'
type cacheValue = Paginator<UserQueryPagination, User>
export const cacheManager = {

    load: function (key: string, opt: cacheOpt): cacheValue | undefined {
        const value = data.get(opt + key)
        return undefined
    },
    createKey: function <T extends { [key: string]: any }>(query: T): string {
        return Object.values(query).join('-')
    },

    save: function (key: string, opt: cacheOpt, value: cacheValue) {
        // if (opt === 'chat')
        value.items = value.items.map(u => parseUserPhoto(u))
        data.set(opt + key, value)
    },
    clear: function (opt: cacheOpt | 'all') {
        if (opt === 'all')
            data.clear()
        else
            for (const key of data.keys()) {
                if (key.startsWith(opt)) {
                    data.delete(key)
                }
            }
    },
}