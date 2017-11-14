import { DtoRecord } from '../../../server/src/interfaces/dto_record';
import { StringUtil } from './string_util';

export class CompareUtil {

    static compare(o: DtoRecord, t: DtoRecord): boolean {
        if ((!o && t) || (o && !t)) {
            return false;
        }
        return (!o && !t) ||
            (o.collectionId === t.collectionId &&
                (o.pid || '') === (t.pid || '') &&
                o.category === t.category &&
                o.name === t.name &&
                (o.url || '') === (t.url || '') &&
                (o.method || 'GET') === (t.method || 'GET') &&
                StringUtil.headersToString(o.headers as any) === StringUtil.headersToString(t.headers as any) &&
                (o.body || '') === (t.body || '') &&
                (o.bodyType || '') === (t.bodyType || '') &&
                (o.parameters || '') === (t.parameters || '') &&
                o.parameterType === t.parameterType &&
                (o.test || '') === (t.test || '') &&
                (o.prescript || '') === (t.prescript || ''));
    }
}