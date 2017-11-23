import { POST, GET,PUT, DELETE, BodyParam, PathParam, BaseController,Param } from 'webapi-router';
import { ResObject } from '../common/res_object';
import * as Koa from 'koa';
import { RecordService } from '../services/record_service';
import { SessionService } from '../services/session_service';
import {DtoSwaggerCache} from "../interfaces/dto_swagger_cache";
import {SwaggerService} from "../services/swagger_service";

export default class SwaggerController extends BaseController {

    @POST('/swagger/:id')
    async createOrUpdate(ctx: Koa.Context, @BodyParam sc: DtoSwaggerCache): Promise<ResObject> {
        const user = SessionService.getUser(ctx);
        return await SwaggerService.save(SwaggerService.fromDto(sc), user);
    }
    @GET('/swagger/:id')
    async get(ctx: Koa.Context,@PathParam('id') id: string){
        const user = SessionService.getUser(ctx);
        return await SwaggerService.getLast(id);
    }

    @DELETE('/swagger/:id')
    async delete( @PathParam('id') id: string): Promise<ResObject> {
        return await RecordService.delete(id);
    }

    @POST('/swagger/refresh')
    async refresh(ctx: Koa.Context, @BodyParam data: DtoSwaggerCache) {
        const user = SessionService.getUser(ctx);
        const record = SwaggerService.fromDto(data);
        return await SwaggerService.refreshByUrlOrId(record, user);
    }

    @POST('/swagger/history/:historyId')
    async history(ctx: Koa.Context, @PathParam('historyId') historyId: string,@BodyParam data: DtoSwaggerCache) {
        const record = SwaggerService.fromDto(data);
        const userId = SessionService.getUserId(ctx);
        return await SwaggerService.getByHistory(record,historyId);
    }

    @GET('/swagger/init')
    async buildRemote(ctx: Koa.Context, @BodyParam data: DtoSwaggerCache) {
        const record = SwaggerService.fromDto(data);
        const userId = SessionService.getUserId(ctx);
        return await SwaggerService.initByUrl(record);
    }



}