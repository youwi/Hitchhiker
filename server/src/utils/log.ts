import * as Log4js from 'log4js';
import { Logger, getLogger } from 'log4js';
import * as Path from 'path';

export class Log {

    private static logger: Logger;

    static init() {
   //    Log4js.configure(Path.join(__dirname, '../logconfig.js'));
        Log4js.configure(
        {
            "appenders": [{
            "type": "file",
            "filename": "logs/log_file.log",
            "maxLogSize": 20480000,
            "backups": 10,
            "category": "default"
        },
            {
                "type": "console",
                "category": "console"
            }
        ],
            "levels": {
            "relative-logger": "ALL",
                "console": "ALL"
        },
            "replaceConsole": true
        });
        Log.logger = getLogger('default');
        Log.logger.setLevel(Log4js.levels.DEBUG);
    }

    static info(info: string) {
        Log.logger.info(info);
    }

    static debug(debug: string) {
        Log.logger.debug(debug);
    }

    static warn(warn: string) {
        Log.logger.warn(warn);
    }

    static error(error: string) {
        Log.logger.error(error);
    }
}