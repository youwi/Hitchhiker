import { DtoHeader } from './dto_header';
import { RecordCategory } from '../common/record_category';
import { BodyType } from '../common/string_type';
import { DtoUser } from './dto_user';
import { ParameterType } from '../common/parameter_type';

/**
 *  record readonly
 */
export interface DtoRecordTpl {

    id: string;

    collectionId: string;

    pid?: string;

    category: RecordCategory;

    name: string;

    url?: string;

    method?: string;

    headers?: DtoHeader[];

    history?: DtoRecordTplHistory[];

    body?: string;

    bodyType?: BodyType;

    parameters?: string;

    parameterType: ParameterType;

    prescript?: string;

    test?: string;

    sort?: number;
}

export interface DtoRecordTplHistory {

    id: number;

    record: DtoRecordTpl;

    user: DtoUser;

    createDate: Date;
}