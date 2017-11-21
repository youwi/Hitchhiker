export class Urls {

    static host = require("../config").env.HOST //'HITCHHIKER_APP_HOST';
    static cross= require("../config").env.CROSS

    static getUrl(action: string): string {
        if(Urls.cross)
            return `${Urls.host}api/${action}`;
        return window.location.origin+"/api/"+action
    }

    static getWebSocket(action: string): string {
        //remote cross
        if(Urls.cross)
            return `ws${Urls.host.substr(4)}${action}`;
        // local
        let l = window.location;
        return ((l.protocol === "https:") ? "wss://" : "ws://") + l.host +"/" + action;
    }
} 