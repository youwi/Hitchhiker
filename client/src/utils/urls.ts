export class Urls {

    static host = require("../config").env.HOST//'HITCHHIKER_APP_HOST';

    static getUrl(action: string): string {
        return `${Urls.host}api/${action}`;
    }

    static getWebSocket(action: string): string {
        return `ws${Urls.host.substr(4)}${action}`;
    }
} 