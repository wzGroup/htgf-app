
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import moment from 'moment'

import store from './store/store'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import './assets/css/common/iconfont/iconfont.js'

import promise from 'es6-promise';

// 全局过滤器
import * as filters from './mixins/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

promise.polyfill();

import 'babel-polyfill'

import qs from 'qs';
Vue.prototype.$moment = moment;
Vue.use(qs)

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(vueSwiper)

import commonJS from './utils/common.js'
Vue.prototype.$commonJS = commonJS

import axiosHttp from './utils/ajax/axiosHttp.js'
Vue.prototype.$axiosHttp = axiosHttp

import urls from './utils/goUrl.js'
Vue.prototype.$urls = urls

//引入底部tab
import { Tabbar, TabItem ,Toast} from 'mint-ui';
//vue中全局定义mintUI中toast

Vue.component(Tabbar.name, Tabbar,Toast);
Vue.component(TabItem.name, TabItem)

//tab内容区域
import { TabContainer, TabContainerItem } from 'mint-ui';
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

//视频播放组件
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
//import 'vue-video-player/node_modules/video.js/dist/video-js.css'
//require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer,{
	    options:{
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, // 如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
						src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // url地址
					}],
					hls: true,
					poster: 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg', // 你的封面地址
					width: document.documentElement.clientWidth, // 播放器宽度
					notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true, //时间分割线
						durationDisplay: true, //总时间
						remainingTimeDisplay: false, //剩余播放时间
						progressControl: true, // 进度条
						fullscreenToggle: true // 全屏按钮
					}
				}
})


//引入下拉刷新和上拉加载
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

import '../static/fonts/font-awesome/css/font-awesome.min.css'
import './assets/css/common/base.scss';
import './assets/css/common/layout.scss';
import httpConfig from './utils/httpConfig.js';

// 引入连接截取
import splitUrl from './utils/splitUrl.js';

// 引入埋点文件
import hrMd from './mixins/md/hrMd';

// 引入base64
let Base64 = require('js-base64').Base64;
Vue.prototype.$httpConfig = httpConfig;
Vue.prototype.$splitUrl = splitUrl;



//添加一个全局变量，判断当前是否为ios手机
window.appIsIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App , hrMd }
})
