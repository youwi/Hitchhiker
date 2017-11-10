import { RequestState, requestStateDefaultValue } from './request';
import * as _ from 'lodash';

export class LocalDataState {

    fetchLocalDataState: RequestState;
}

export const localDataDefaultValue: LocalDataState = {
    fetchLocalDataState: requestStateDefaultValue
};