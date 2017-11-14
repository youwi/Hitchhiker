import { DtoRecord } from './dto_record';
import * as _ from 'lodash';
export interface DtoCollection {

    id: string;

    name: string;

    projectId: string;

    description: string;
}

export interface DtoCollectionWithRecord {

    collections: _.Dictionary<DtoCollection>;

    records: _.Dictionary<_.Dictionary<DtoRecord>>;
}