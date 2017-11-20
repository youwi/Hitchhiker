import * as Koa from 'koa';
import * as Compose from 'koa-compose';
import * as Bodyparser from 'koa-bodyparser';
import * as Session from 'koa-session-minimal';
import { WebApiRouter } from 'webapi-router';
import sessionHandle from './session_handle';
import { SessionService } from '../services/session_service';
import routeFailed from './route_failed';
import errorHandle from './error_handle';
import * as KoaStatic from 'koa-static';
import * as Path from 'path';
import asyncInit from './async_init';

export default function middleware(context: Koa) {
    const ctrlRouter = new WebApiRouter();
    return Compose(
        [
            asyncInit(),
            errorHandle(),
            /**
             *  you can serve static resource use nginx .
             *
             */
            KoaStatic(Path.join(__dirname, '../../../client/build'), { gzip: true }),
            Session({
                cookie: { maxAge: SessionService.maxAge }
            }),
            sessionHandle(),
            Bodyparser(),
            /**
               typescript use ts file!
               this can not use ts-node
            */
            ctrlRouter.router(Path.join(__dirname,'../controllers'), 'api'),
            routeFailed(),
        ]
    );
}