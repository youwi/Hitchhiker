import * as Koa from 'koa';
import Middleware from './middlewares/middleware';
import { Log } from './utils/log';
import { ChildProcessManager } from './run_engine/child_process_manager';
import 'reflect-metadata';
import { WebSocketService } from './services/web_socket_service';
import { Setting } from './utils/setting';
import { ProjectDataService } from './services/project_data_service';
import * as  cors from 'koa-cors'

let app = new Koa();

app.use(cors());

Log.init();

Setting.instance.init();

ProjectDataService.instance.init();

ChildProcessManager.instance.init();

app.use(Middleware(app));

const server = app.listen(Setting.instance.appPort);

server.timeout = 30 * 60 * 1000;

new WebSocketService(server).start();