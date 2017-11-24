import { StringUtil } from '../utils/string_util';

import {ConnectionManager} from "./connection_manager";
import {SwaggerCache} from "../models/swagger_cache";
import {ResObject} from "../common/res_object";
import {Message} from "../common/message";
import {DtoSwaggerCache} from "../interfaces/dto_swagger_cache";
import {DtoUser} from "../interfaces/dto_user";
import {User} from "../models/user";
import {Log} from "../utils/log";
import * as request from 'request';

export class SwaggerService {


    static fromDto(dto: DtoSwaggerCache) {
        const variable = dto as SwaggerCache;
        variable.id = variable.id || StringUtil.generateUID();
        return variable;
    }

    static async save(swagger: SwaggerCache,user:DtoUser): Promise<ResObject> {
        const connection = await ConnectionManager.getInstance();

        await connection.getRepository(SwaggerCache).persist(swagger);

        return { success: true, message: Message.projectSaveSuccess };
    }

    static async updateCache(cache: SwaggerCache): Promise<ResObject> {
        const connection = await ConnectionManager.getInstance();

        await connection.getRepository(SwaggerCache)
            .createQueryBuilder('swagger_cache')
            .where('id=:id', { id: cache.id })
            .update({ content: cache.content, updateDate: cache.updateDate })
            .execute();

        return { success: true, message: Message.projectSaveSuccess };
    }
    static async getLast(id:string){
        const connection = await ConnectionManager.getInstance();

        const cache = await connection.getRepository(SwaggerCache)
            .createQueryBuilder('swagger_cache')
            .where(`swagger_cache.project_id = :id`,{id})
            .getOne();
        return cache|| { success: false, message: Message.swaggerNotFound };
    }

    static getByHistory(record: SwaggerCache, historyId: string) {
        
    }

    static initByUrl(record: SwaggerCache) {
        record.id = record.id || StringUtil.generateUID();
        request(record.url).then((body)=>{
            record.content=body
            SwaggerService.save(record,null);
        })
    }

    private static request(option: request.Options): Promise<any> {
        return new Promise<{ err: any, response: request.RequestResponse, body: any }>((resolve, reject) => {
            request(option, (err, response, body) => {
                resolve({ err, response, body });
                if (err) {
                    Log.error(err);
                } else {
                    Log.info(body);
                }
            });
        });
    }

    static refreshByUrlOrId(record: SwaggerCache, user: User) {

    }
}