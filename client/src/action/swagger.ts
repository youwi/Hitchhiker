import { takeEvery, put } from 'redux-saga/effects';
import { syncAction } from './index';
import { HttpMethod } from '../common/http_method';
import { Urls } from '../utils/urls';


export const InitUpdateSwagger="initSwagger by url"
export const SelectedProjectChangedSwaggerType="select project then swagger will change"

export function* initSwaggerNow() {
    yield takeEvery(InitUpdateSwagger, function* (action: any) {
        const { url } = action.value;
        const channelAction = syncAction({ type: InitUpdateSwagger, method: HttpMethod.GET, url: Urls.getUrl(`swagger/init?url=${url}`)});
        yield put(channelAction);
    });
}


export function* changeSwagger() {
    yield takeEvery(SelectedProjectChangedSwaggerType, function* (action: any) {
        const  id  = action.value;
        const channelAction = syncAction({ type: SelectedProjectChangedSwaggerType, method: HttpMethod.GET, url: Urls.getUrl(`swagger/${id}`)});
        yield put(channelAction);
    });
}
