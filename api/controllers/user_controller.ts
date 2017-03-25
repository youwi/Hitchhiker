import { POST, BodyParam, BaseController } from 'webapi-router';
import { ResObject } from "../common/res_object";
import { UserService } from "../services/user_service";
import * as Koa from 'koa';

export default class UserController extends BaseController {

    @POST("/user")
    async register( @BodyParam body: { name: string, email: string, pwd: string }): Promise<ResObject> {
        return await UserService.createUser(body.name, body.email, body.pwd);
    }

    @POST()
    async login(ctx: Koa.Context, @BodyParam body: { email: string, pwd: string }): Promise<ResObject> {
        let checkLogin = await UserService.checkUser(body.email, body.pwd);

        if (!checkLogin.success) {
            return checkLogin;
        }

        ctx.sessionHandler.regenerateId();
        ctx.session.user = checkLogin.result;

        checkLogin.result = undefined;

        return checkLogin;
    }
}