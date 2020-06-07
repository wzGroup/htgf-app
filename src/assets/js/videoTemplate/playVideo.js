/**
 * 黑色提示条的显示和隐藏
 * @author songxiaoyu  2017-07-20
 * html页面video区域  需传video id字符串
 * url为视频地址
 * 
 */
import $ from 'jquery'
var scriptArr = document.getElementsByTagName('script'),
    l = scriptArr.length,
    s = scriptArr[l - 2];

var swfobject = document.createElement('script');
swfobject.setAttribute('charset', 'utf-8');
swfobject.setAttribute('type', 'text/javascript');
//swfobject.type = 'text/javascript';
swfobject.src = '/static/core/video/butelVideoPlayer.js';

var butelVideoPlayer = document.createElement('script');
butelVideoPlayer.setAttribute('type', 'text/javascript');
//butelVideoPlayer.type = 'text/javascript';
butelVideoPlayer.src = '/static/core/video/swfobject.js';

$(s).after(swfobject);
$(swfobject).after(butelVideoPlayer);

//import '../../../utils/video/swfobject.js'
//import '../../../utils/video/butelVideoPlayer.js'
//require('@/utils/video/swfobject.js')
//require('@/utils/video/butelVideoPlayer.js')


export default function(url,ele) {
    var playVideo = {
        $ele: $('body #' + ele ),
        videoConfig: {
            width: '', //视频区域宽度
            height: '', //视频区域高度
            ctype: 3, //视频类型，1为直播，3为点播，直播类型不显示进度条，点播显示进度条
            //视频播放地址，对于直播内容可以设置多个地址，播放器根据加载容器类型选择加载flash或者h5播放器
            //直播地址 obj.SD="http://live.butel.com/live/44b7.flv,http://wshls.butel.com/live/44b7.m3u8"
            SD: url,  //http://vod.butel.com/734c64ef-b924-48f9-bfcd-2c79fb377263.m3u8
        },
        timer: '',
        num:0,
        init: function() {
            var that = this;

            that.getVideoArea();
            that.play();
        },
        getVideoArea: function() {
            var that = this;

            that.videoConfig.width = that.$ele.width();
            that.videoConfig.height = that.$ele.height();
        },
        play: function() {
            var that = this;
            
            that.timer = setTimeout(function() {
                that.isReady() ? that.initVideo() : that.play();
            }, 50);

        },
        isReady: function() {
            return typeof butelVideoPlayerInit == 'function';
        },
        initVideo: function() {
            var that = this;
            butelVideoPlayerInit(ele, that.videoConfig)
            clearTimeout(that.timer);
        },
    };
    playVideo.init();
}