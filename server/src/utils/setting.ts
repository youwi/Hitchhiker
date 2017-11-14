import * as fs from 'fs';
import * as path from 'path';
import { Log } from './log';

export class Setting {

    private _setting: any;

    static readonly instance = new Setting();

    private constructor() {
        this._setting = require('../../appconfig');
    }

    init() {
        const frontEndJSFolder = path.join(__dirname, '../public/static/js');
        if (!fs.existsSync(frontEndJSFolder)) {
            Log.warn(`dir ${frontEndJSFolder} is not a valid path`);
            return;
        }
        const files = fs.readdirSync(frontEndJSFolder).filter(value => value.endsWith('.js') && fs.lstatSync(path.join(frontEndJSFolder, value)).isFile);
        files.forEach(file => {
            const filePath = path.join(frontEndJSFolder, file);
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace('HITCHHIKER_APP_HOST', this.appHost);
            fs.writeFileSync(filePath, content, { encoding: 'utf8' });
        });
    }

    get env() {
        return this.app.env;
    }

    get isDev() {
        return this.env === 'DEV';
    }

    get isProd() {
        return this.env === 'PROD';
    }

    get needRegisterMailConfirm(): boolean {
        return this._setting.user.registerMailConfirm;
    }

    get mail() {
        return this._setting.mail;
    }

    get app() {
        return this._setting.app;
    }

    get appApi() {
        return this.isDev ? this.app.api : (`${process.env.HITCHHIKER_APP_HOST}api/` || this.app.api);
    }

    get appHost() {
        return this.isDev ? this.app.host : (process.env.HITCHHIKER_APP_HOST || this.app.host);
    }

    get appLanguage() {
        return this.isDev ? this.app.language : (process.env.HITCHHIKER_APP_LANG || this.app.language);
    }

    get appPort() {
        let port = this.appHost.substr(this.appHost.lastIndexOf(':') + 1).replace('/', '');
        if (!(/^[0-9]*$/.test(port))) {
            port = 8080;
        }
        return this.isDev ? 81 : port;
    }

    get schedule() {
        return this._setting.schedule;
    }

    get scheduleDuration() {
        return process.env.HITCHHIKER_SCHEDULE_DURATION || this.schedule.duration;
    }

    get scheduleMaxCount() {
        return process.env.HITCHHIKER_SCHEDULE_COUNT || this.schedule.storeMaxCount;
    }

    get stressMaxCount() {
        return process.env.HITCHHIKER_STRESS_COUNT || this._setting.stress.storeMaxCount;
    }

    get stressPort() {
        return this.isDev ? 11011 : (process.env.HITCHHIKER_STRESS_PORT || this._setting.stress.stressPort);
    }

    get stressUpdateInterval() {
        return process.env.HITCHHIKER_STRESS_UPDATE_INTERVAL || this._setting.stress.stressUpdateInterval;
    }

    get syncInterval() {
        return process.env.HITCHHIKER_SYNC_INTERVAL || this.app.syncInterval;
    }

    get db() {
        return this._setting.db;
    }

    get defaultHeaders() {
        return process.env.HITCHHIKER_DEFAULT_HEADERS || (this._setting.app.defaultHeaders ? this._setting.app.defaultHeaders.join('\n') : '');
    }

    get safeVM() {
        return process.env.HITCHHIKER_SAFE_VM === undefined ? this.app.safeVM : process.env.HITCHHIKER_SAFE_VM;
    }

    get scriptTimeout() {
        return process.env.HITCHHIKER_SCRIPT_TIMEOUT || this.app.scriptTimeout;
    }
}