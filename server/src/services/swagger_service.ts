import { StringUtil } from '../utils/string_util';
import { Variable } from '../models/variable';
import { DtoVariable } from '../interfaces/dto_variable';
import {ConnectionManager} from "./connection_manager";
import {SwaggerCache} from "../models/swagger_cache";
import {ResObject} from "../common/res_object";
import {Message} from "../common/message";

export class SwaggerService {



    static fromDto(dtoVariable: DtoVariable) {
        const variable = dtoVariable as Variable;
        variable.id = variable.id || StringUtil.generateUID();
        return variable;
    }
    static async getSwaggerJsonHistory(history:number,id:string){

    }

    static async getLastedSwaggerJsonById(id: string): Promise<Record> {

        return record;
    }

    static async applyVariable(envId: string, content: string): Promise<string> {

    }
    static async saveSwagger(){
        const connection = await ConnectionManager.getInstance();

    }
    static async save(swagger: SwaggerCache): Promise<ResObject> {
        const connection = await ConnectionManager.getInstance();
        await connection.getRepository(SwaggerCache).persist(swagger);

        return { success: true, message: Message.projectSaveSuccess };
    }

    static async updateProject(dtoProject: DtoProject): Promise<ResObject> {
        const connection = await ConnectionManager.getInstance();

        await connection.getRepository(Project)
            .createQueryBuilder('project')
            .where('id=:id', { id: dtoProject.id })
            .update({ name: dtoProject.name, note: dtoProject.note })
            .execute();

        return { success: true, message: Message.projectSaveSuccess };
    }
}