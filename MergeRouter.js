const fs = require('fs');
const path = require('path');
const _ = require('lodash');
var babel = require("@babel/core");


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
function MegerRouterPlugin(options) {
  // options是配置文件，你可以在这里进行一些与options相关的工作
}

MegerRouterPlugin.prototype.apply = function (compiler) {
  // 注册 before-compile 钩子，触发文件合并
  compiler.hooks.emit.tapAsync('before-compile', (compilation, callback) => {
    // 最终生成的文件数据
    const data = {};
    const routesPath = resolve('src/routes');
    const targetFile = resolve('src/router-config.js');
    // 获取路径下所有的文件和文件夹
    const dirs = fs.readdirSync(routesPath);
    try {
      dirs.forEach((dir) => {
        const routePath = resolve(`src/routes/${dir}`);
        // 判断是否是文件夹
        if (fs.statSync(routePath).isDirectory()) {
          return true;
        }
        delete require.cache[`${routePath}/index.js`];
        const routeInfo = require(routePath);
        generate(routeInfo, dir, data);
     
      });
    } catch (e) {
      console.log(e);
    }

    // 如果 router-config.js 存在，判断文件数据是否相同，不同删除文件后再生成
    if (fs.existsSync(targetFile)) {
      delete require.cache[targetFile];
      const targetData = require(targetFile);
      if (!_.isEqual(targetData, data)) {
        writeFile(targetFile, data);
      }
    // 如果 router-config.js 不存在，直接生成文件
    } else {
      writeFile(targetFile, data);
    }

    // 最后调用 callback，继续执行 webpack 打包
    callback();
  });
};
// 合并当前文件夹下的router数据，并输出到 data 对象中
function generate(config, dir, data) {
  // 合并 router
  mergeConfig(config, dir, data);
 
}
// 合并 router 数据到 targetData 中
function mergeConfig(config, dir, targetData) {
  console.log(config,dir,targetData)
  config.forEach(ele => {
    const { name } = ele;
    Object.assign(targetData, {
      [name]: ele,
    });
  })
  
}
// 写文件
function writeFile(targetFile, data) {
  fs.writeFileSync(targetFile, `module.exports = ${JSON.stringify(data, null, 2)}`, 'utf-8');
}

module.exports = MegerRouterPlugin;

