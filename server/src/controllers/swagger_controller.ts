import { POST, GET,PUT, DELETE, BodyParam, PathParam, BaseController } from 'webapi-router';
import { ResObject } from '../common/res_object';
import * as Koa from 'koa';
import { RecordService } from '../services/record_service';
import { RecordRunner } from '../run_engine/record_runner';
import { DtoRecord } from '../interfaces/dto_record';
import { DtoRecordRun } from '../interfaces/dto_record_run';
import { DtoRecordSort } from '../interfaces/dto_record_sort';
import { SessionService } from '../services/session_service';
import {DtoSwaggerCache} from "../interfaces/dto_swagger_cache";
import {SwaggerService} from "../services/swagger_service";

export default class SwaggerController extends BaseController {

    @POST('/swagger/:id')
    async createOrUpdate(ctx: Koa.Context, @BodyParam sc: DtoSwaggerCache): Promise<ResObject> {
        const user = SessionService.getUser(ctx);
        return await RecordService.create(RecordService.fromDto(record), user);
    }
    @GET('/swagger/:id')
    async get(ctx: Koa.Context, @BodyParam record: DtoSwaggerCache): Promise<ResObject> {
        const user = SessionService.getUser(ctx);
        return await SwaggerService.create(RecordService.fromDto(record), user);
    }

    @DELETE('/swagger/:id')
    async delete( @PathParam('id') id: string): Promise<ResObject> {
        return await RecordService.delete(id);
    }

    @GET('/swagger/refresh')
    async refresh(ctx: Koa.Context, @BodyParam record: DtoRecord): Promise<ResObject> {
        const user = SessionService.getUser(ctx);
        return await RecordService.update(RecordService.fromDto(record), user);
    }

    @POST('/swagger/history')
    async history(ctx: Koa.Context, @BodyParam data: DtoRecordRun) {
        const record = RecordService.fromDto(data.record);
        const userId = SessionService.getUserId(ctx);
        return await RecordRunner.runRecordFromClient(record, data.environment, userId, ctx.res);
    }

    @GET('/swagger/init')
    async buildRemote(ctx: Koa.Context, @BodyParam data: DtoRecordRun) {
        const record = RecordService.fromDto(data.record);
        const userId = SessionService.getUserId(ctx);
        return await RecordRunner.runRecordFromClient(record, data.environment, userId, ctx.res);
    }



}