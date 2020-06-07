// var gulp = require('gulp'),
//     require('gulp-mock-server');
//     // plugins = require('gulp-load-plugins')(); //引入gulp插件
//     // var mockServer = require('gulp-mock-server');

    var gulp = require('gulp');
var mockServer = require('gulp-mock-server');

module.exports = function(options) {

    //gulp-mock-server   mock模拟假数据
    gulp.task('mock', function() {
        gulp.src('.')
            .pipe(mockServer({
                //livereload: false,
                host: options.ip,
                // host: '172.16.191.124',
                directoryListing: true,
                port: options.port.mock,
                open: false,
                //https: true,
                allowCrossOrigin: true
            }));
    })


}


