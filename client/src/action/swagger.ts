import { takeEvery, put,call } from 'redux-saga/effects';
import {actionCreator, SessionInvalidType, syncAction} from './index';
import { HttpMethod } from '../common/http_method';
import { Urls } from '../utils/urls';
import RequestManager from '../utils/request_manager';


export const InitUpdateSwagger="initSwagger by url"
export const SelectedProjectChangedSwaggerType="select project then swagger will change"
export const SelectedProjectChangedGotSwaggerType="select project then swagger now update local"

export const SwaggerChangerProgressType="change PATH_TAG's  progress object "
export const SwaggerGetAllPathTagType="get All  PATH_TAG  progress object"
export const SwaggerMergePathTagType="merge  PATH_TAG progress to local"


export function* initSwaggerNow() {
    yield takeEvery(InitUpdateSwagger, function* (action: any) {
        const { url } = action.value;
        let swagger=yield call(RequestManager.get,Urls.getUrl(`swagger/init?url=${url}`));
        let runResult: any = {};
        runResult=yield swagger.json()
        yield put(actionCreator(SelectedProjectChangedGotSwaggerType, { swagger:runResult }));
    });
}


export function* swaggerGetProjectAllPathTag() {
    yield takeEvery(SwaggerGetAllPathTagType, function* (action: any) {
        let request=yield call(RequestManager.post,Urls.getUrl(`swagger/pathTags`),action.value);
        let pathTags=yield request.json()
        yield put(actionCreator(SwaggerGetAllPathTagType, { pathTags }));
    });
}

export function* swaggerPathProgressUpdate() {
    yield takeEvery(SwaggerChangerProgressType, function* (action: any) {
        yield put(actionCreator(SwaggerMergePathTagType, { pathTag:action.value }));
        // let request=yield call(RequestManager.post,Urls.getUrl(`swagger/pathTagUpdate`),action.value);
        // yield request.json()
        const channelAction = syncAction({ type: SwaggerChangerProgressType, method: HttpMethod.POST, url: Urls.getUrl(`swagger/pathTagUpdate`),body:action.value});
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
