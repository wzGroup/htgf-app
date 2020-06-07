'use strict';

/**
 *  前端-股份-恒天金投H5 vue单页面项目 gulp打包配置
    @author songxiaoyu 2020.6.6

    gulp打包图片、第三方文件、起本地mock服务

 */


//引入构建需要的插件
var gulp = require('gulp'),
    // plugins = require('gulp-load-plugins')(), //引入gulp插件
    
    //node模块
    os = require('os'),
    minimist = require('minimist'); //命令行替换变量

//默认环境变量
//env----变量活动
var knownOptions = {
    string: 'env', 
    default: { 
        env: process.env.NODE_ENV || '0', //默认开发环境
        project: '' //默认打包所有项目
    }
}; 


//将命令行的参数和knownOptions合并
global.options = minimist(process.argv.slice(2), knownOptions);

//保存project变量
var project = options.project;

//获取当前电脑的ip
var localIp = (function(){
    var interfaces = require('os').networkInterfaces();
        for(var devName in interfaces){
            var iface = interfaces[devName];
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    return alias.address;
                }
            }
        }
})();

//无论什么环境，都打包到dist文件夹中
options.path = 'dist/lgbCdn/';

options.port = {
    //server: 7000, //作为当前项目的本地服务的端口号
    mock: 8309 //当前项目本地Mock服务的端口号
};
options.ip =  localIp, //本地ip

console.log( '当前项目配置options：' + JSON.stringify(options) );

//gulp任务require
// require('./build/gulp/gulpImage.js')(options);
// require('./build/gulp/gulpVendor.js')(options  );
require('./build/gulp/gulpMockServer.js')( options );

if ( options.env === '0' ) { 
    //本地环境起mock服务
    gulp.task('default',['mock']);
}
// else {
//     gulp.task('default', ['vendor']);
// }


//从640图转换为750图的px，需要用20乘以750/640
//留着备用
// gulp.task('rem2px', function() {
//     return gulp.src( ['less/*.less'] )
//         .pipe( plugins.remToPx({
//             fontSize:  (750/640)*20
//         }))
//         .pipe(gulp.dest(options.middle + '/less'));
// });

// gulp.task('px2rem', function() {
//     return gulp.src( 'middle/less/**/*.less' )
//         .pipe( plugins.pxToRem({
//             rootPX: 40
//         }))
//         .pipe(gulp.dest(options.middle + '/css'));
// });


