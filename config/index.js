
'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const os = require('os')

//获取命令行环境变量
const argEnv = require('yargs').argv.env

function getLocalIp() {
    var osNet = os.networkInterfaces();
    for (var devName in osNet) {
        var iface = osNet[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

//当前电脑ip
var localIp = getLocalIp();

module.exports = {
  
  //测试环境、预生产、生产打包所用
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    

    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,

    //根据不同环境添加埋点域名
    mdDomain: (function(){
      if( argEnv == 4 ){
        //生产
        return 'https://dc.chtwm.com'
      }
      else if( argEnv == 3){
        //预生产
        return 'https://dc.uata.haomalljf.com'
      }
      else if ( argEnv == 2){
        //测试
        return 'https://dc.qasa.chtwm.com'
      }
    })(),

    //根据不同环境添加cdn域名
    assetsPublicPath: argEnv == 4 ? 'https://taskmanageh5.chtwm.com/' : './' , 
  },

  //开发环境打包所用
  dev: {
    host: '0,0,0,0',
    env: require('./dev.env'),
    port: process.env.PORT || 8300,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',

    assetsPublicPath: '/',
    mdDomain: 'http://localhost:9099',

    proxyTable: {
      '/web': {
        // target: 'http://'+localIp+':8309/', //本地环境
         target: 'https://h5.chtwmlocal.com',//股份-联调环境
        // target:'http://h5.chtwmtest.com',//股份-测试环境
        changeOrigin: true,
        secure: false,
        // pathRewrite: {
        //     '^/api': '/api/'
        // }
      },
      '/web/account/frontend/loginCheck': {
        target: 'https://h5.chtwmlocal.com',//股份-联调环境
        changeOrigin: true,
        secure: false
      },
    },
    cssSourceMap: false
  }
}
