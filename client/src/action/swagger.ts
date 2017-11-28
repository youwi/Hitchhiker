import { takeEvery, put,call } from 'redux-saga/effects';
import {actionCreator, SessionInvalidType, syncAction} from './index';
import { HttpMethod } from '../common/http_method';
import { Urls } from '../utils/urls';
import RequestManager from '../utils/request_manager';


export const InitUpdateSwagger="initSwagger by url"
export const SelectedProjectChangedSwaggerType="select project then swagger will change"
export const SelectedProjectChangedGotSwaggerType="select project then swagger now change"


export function* initSwaggerNow() {
    yield takeEvery(InitUpdateSwagger, function* (action: any) {
        const { url } = action.value;
        const channelAction = syncAction({ type: InitUpdateSwagger, method: HttpMethod.GET, url: Urls.getUrl(`swagger/init?url=${url}`)});
        yield put(channelAction);
    });
}


export function* changeSwagger() {
    yield takeEvery(SelectedProjectChangedSwaggerType, function* (action: any) {
        const value = action.value;
        let runResult: any = {};
        try {
            const res = yield call(RequestManager.get, Urls.getUrl(`swagger/${value}`));
            if (res.status === 403) {
                yield put(actionCreator(SessionInvalidType));
            }
            runResult = yield res.json();
        } catch (err) {
            runResult.error = { message: err.message, stack: err.stack };
        }
        yield put(actionCreator(SelectedProjectChangedGotSwaggerType, { id: value, swagger:runResult[0] }));
    });
    // yield takeEvery(SelectedProjectChangedSwaggerType, function* (action: any) {
    //     const  id  = action.value;
    //     const channelAction = syncAction({ type: SelectedProjectChangedSwaggerType, method: HttpMethod.GET, url: Urls.getUrl(`swagger/${id}`)});
    //     yield put(channelAction);
    // });
}
