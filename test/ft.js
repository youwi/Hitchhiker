var fs = require('fs');

var nodeModules = {};
/**
 * 打包后台应用的例子
 */
if(fs.existsSync('../server/node_modules')) {
    fs.readdirSync('../server/node_modules')
        .filter(function (x) {
            return
        })
}
