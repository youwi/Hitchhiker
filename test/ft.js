
/**
 * 打包后台应用的例子
 */
// var fs = require('fs');
//
// var nodeModules = {};
// if(fs.existsSync('../server/node_modules')) {
//     fs.readdirSync('../server/node_modules')
//         .filter(function (x) {
//             return
//         })
// }
//



  function  requestA(option){
    return new Promise<{ err, response, body }>((resolve, reject) => {
        request(option, (err, response, body) => {
            resolve({ err, response, body });
            if (err) {
             } else {
             }
        });
     });
    }

