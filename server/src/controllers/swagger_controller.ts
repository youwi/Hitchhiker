

import { POST, GET,PUT, DELETE, BodyParam, PathParam, BaseController,QueryParam } from 'webapi-router';
import { ResObject } from '../common/res_object';
import * as Koa from 'koa';
import { RecordService } from '../services/record_service';
import { SessionService } from '../services/session_service';
import {DtoSwaggerCache} from "../interfaces/dto_swagger_cache";
import {SwaggerService} from "../services/swagger_service";
import {DtoPathTag} from "../interfaces/dto_path_tag";

export default class SwaggerController extends BaseController {

    @GET('/swagger/init')
    async buildRemote(ctx: Koa.Context, @QueryParam("url") url: string) {
        let data={id:null,key:null,projectId:null,url:url,content:null,version:null,createDate:null,updateDate:null};
        return await SwaggerService.initByUrl(data);
    }

    @POST('/swagger/refresh')
    async refresh(ctx: Koa.Context, @BodyParam data: DtoSwaggerCache) {
        const user = SessionService.getUser(ctx);
        const record = SwaggerService.fromDto(data);
        return await SwaggerService.refreshByUrlOrId(record, user);
    }

    @POST('/swagger/pathTagUpdate')
    async savePathTag(ctx: Koa.Context, @BodyParam data: DtoPathTag) {
        const user = SessionService.getUser(ctx);
        const record = SwaggerService.fromDtoPathTag(data);
        return await SwaggerService.savePathTag(record, user);
    }
    @GET('/swagger/pathTags')
    async getAllPathTagsByProjectId(ctx: Koa.Context, @QueryParam('projectId') projectId) {
        return await SwaggerService.getAllPathTags(projectId);
    }
    @GET('/swagger/pathRecords')
    async getAllPathRecordsByUrl(ctx: Koa.Context, @QueryParam("url") url: string) {
        return await SwaggerService.getAllPathRecords(url);
    }

    @POST('/swagger/:id')
    async createOrUpdate(ctx: Koa.Context, @BodyParam sc: DtoSwaggerCache): Promise<ResObject> {
        const user = SessionService.getUser(ctx);
        return await SwaggerService.save(SwaggerService.fromDto(sc), user);
    }
    @GET('/swagger/:id')
    async get(ctx: Koa.Context,@PathParam('id') id: string){
        return await SwaggerService.getLast(id);
    }

    @DELETE('/swagger/:id')
    async delete( @PathParam('id') id: string): Promise<ResObject> {
        return await RecordService.delete(id);
    }



    @POST('/swagger/history/:historyId')
    async history(ctx: Koa.Context, @PathParam('historyId') historyId: string,@BodyParam data: DtoSwaggerCache) {
        const record = SwaggerService.fromDto(data);
        return await SwaggerService.getByHistory(record,historyId);
    }



}