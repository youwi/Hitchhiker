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
import fetch from  'node-fetch';
import {PathTag} from "../models/path_tag"
import {DtoPathTag} from "../interfaces/dto_path_tag";

export class SwaggerService {


    static fromDto(dto: DtoSwaggerCache) {
        const variable = dto as SwaggerCache;
        variable.id = variable.id || StringUtil.generateUID();
        return variable;
    }
    static fromDtoPathTag(dto: DtoPathTag) {
        const variable = dto as PathTag;
        variable.id = variable.id || StringUtil.generateUID();
        return variable;
    }


    static async save(swagger: SwaggerCache,user:DtoUser): Promise<ResObject> {
        const connection = await ConnectionManager.getInstance();

        await connection.getRepository(SwaggerCache).persist(swagger);

        return { success: true, message: Message.projectSaveSuccess };
    }
    static async savePathTag(pathTag:PathTag,user:DtoUser){
        const connection = await ConnectionManager.getInstance();
        let arr= await connection.getRepository(PathTag).query("select * from path_tag where projectId=? and methodPath=?",[pathTag.projectId,pathTag.methodPath])

        if(arr!=null && arr.length>0){
            pathTag.id=arr[0].id
            pathTag.createBy=user.name
        }
        pathTag.createBy=user.name
        await connection.getRepository(PathTag).persist(pathTag);
        return { success: true, message: Message.projectPathTagSaveSuccess };
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
            .query(" select content from swagger_cache where projectId =?\n" +
                " or url=(select swaggerUrl from project where id=? )   ORDER BY createDate desc",[id,id])

        // SELECT *
        // FROM swagger_cache
        // LEFT JOIN project ON project.id = swagger_cache.projectId
        // AND project.id = '1e55eb70-cf9a-11e7-b5f7-293ac40d3e9e-BJfNuf7lz'

        return cache|| { success: false, message: Message.swaggerNotFound };
    }

    static getByHistory(record: SwaggerCache, historyId: string) {
        
    }

    static async initByUrl(record: SwaggerCache) {
        const connection = await ConnectionManager.getInstance();
        record.id = record.id || StringUtil.generateUID();

        record.content=await (await fetch(record.url)).text()
        record.projectId='0'
        //SwaggerService.save(record,null);
        //await connection.manager.save(record);
        //console.log(record.content)
        await connection.getRepository(SwaggerCache).save(record)
        return  JSON.parse(record.content)

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

    public static async getAllPathTags(projectId: string) {
        const connection = await ConnectionManager.getInstance();

        // console.log(connection.getRepository(PathTag)
        //     .createQueryBuilder("path_tag")
        //     .where("projectId=':projectId'",{projectId})
        //     .getSql()
        // )
        // there is a bug
        // const cache = await connection.getRepository(PathTag)
        //     .createQueryBuilder("path_tag")
        //     .where("projectId=':projectId'",{projectId})
        //     .getMany();
        //  //   .query("select * from path_tag where projectId=?",[projectId])
        const cache=await connection.getRepository(PathTag).query(`select * from path_tag where projectId='${projectId}'`)
        if(cache!=null && cache.length>0){
            return { success: true, pathTags:cache};
        }else
            return { success: false, message: "PathTag not Found"};
    }
}