/**
    build env.json

 */

const fs = require('fs');
const del = require('del');

const program = require('commander');
const tasks = new Map();



// -----------------------------------------------------------------------------
tasks.set('clean', () =>{
  del(['dist/*', '!/dist/.git'], { dot: true });
})
// -----------------------------------------------------------------------------
tasks.set('build', () =>{
  const spawn = require('cross-spawn');
  console.log(require("./package.json").scripts.build);
  spawn.sync("npm",["run","build"],{ stdio: 'inherit' });
})


// Copy ./index.md into the /public folder
// -----------------------------------------------------------------------------
tasks.set('copyfiles', () => {
  const fse = require('fs-extra');
  fse.copySync("./dist/","./"+target+"/" );
  fse.copySync("./public/","./"+target+"/" );
});
tasks.set('initEnv', () => {
  buildEnv();
});




let target="release";
function run(task) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return Promise.resolve().then(() => tasks.get(task)()).then(() => {
    console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
  }, err => console.error(err.stack));
}
function  changeDev() {
  const os = require('os');
  let hostName,allip;
  hostName=os.hostname();
  allip=os.networkInterfaces();
  let IPv4="127.0.0.1";
  for(let etp in allip){
    for(let ccp of allip[etp]){
      if(ccp.address.startsWith("10.")||ccp.address.startsWith("192."))
        IPv4=ccp.address;
    }
  }
  console.log('----------local IP: '+IPv4);
  console.log('----------local host: '+hostName);
  fs.writeFileSync('./src/config.ts', JSON.stringify({ip: IPv4+':9090',httpsip:IPv4+':443',httpip:"http://"+IPv4+":9090"}), 'utf8');
}

function buildEnv(){
    program
        .version('0.0.1',"--version")
        .option('-S, --server [server]', '服务地址')
        .option('-P, --port [port]', '服务端口')
        .option('-R, --release [isprd]', 'prd')
        .option('-V, --verbose [verbose]', 'prd')
        .option('-T, --target [target]', 'prd')
        .option('-K, --initenv [initenv]', 'prd')

      .parse(process.argv);
    if(program.target) target=program.target;
    if(program.server&& program.port){
      if(program.server=="localhost") {
        changeDev();
        if (program.initenv) process.exit(0);
      }
      else{
          console.log("IP:"+program.server);
          console.log("PORT:"+program.port);

          fs.writeFileSync('./src/config.ts', JSON.stringify({ip: program.server+':'+program.port,httpsip:program.server+':443',httpip:"http://"+program.server+":"+program.port}), 'utf8');
          if(program.initenv)  process.exit(0);
          return true;
      }
    }else{
        changeDev();
        if (program.initenv) process.exit(0);
    }
}

Promise.resolve()
  .then(() => run('clean'))
  .then(() => run('initEnv'))
  .then(() => run('build'))
  .then(() => run("copyfiles"))

