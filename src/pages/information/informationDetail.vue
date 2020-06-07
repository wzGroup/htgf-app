<template>
	<div id="informationDetailWrap" class="informationDetailWrap">
		<page-title :title="titleName" :headerSetting="headerSetting" @headerClickCallBack="headerClickCallBack">
			<i  class="iconfont icon_share3x" slot="header_right" v-if="!showDefault && isShare">&#xe657;</i>
		</page-title>
		<!-- 视频 -->
		<div v-if="!showDefault">
			<!--<video-player ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions"/>-->
			<div class="videoWrap" v-show="videoShow">
				<div class="artImg" id="video_wrapper" ref="video_wrapper" @click="playVideoFun()"><img :src="imgPoster" ref="video_wrapper_img" alt="">
					<div class="videoButton" v-show="buttonShow">
						<div class="mask"></div>
						<span></span>
						<i class="iconfont playIcon videoPlayIcon">&#xe640;</i>
					</div>
				</div>
			</div>
			<!-- 封面图片 -->
			<div class="coverImg" v-if="detail.coverImageUrl"><img :src="detail.coverImageUrl" alt=""></div>
			<!-- 标题+描述 -->
			<div class="contentWrap">
				<div class="contentTitle">{{detail.title || '--'}}</div>
				<!-- 作者 -->
				<div class="authorWrap">
					<span class="name">{{detail.author || '--'}}</span>
					<!-- <span class="post">职位</span> -->
				</div>
				<!-- 发布时间 -->
				<div class="timeWrap" v-if="detail.publishTime">
					<div class="line" v-if="detail.publishTime"></div>
					<span class="dec">发布时间</span>
					<span class="time">{{detail.publishTime}}</span>
				</div>
				<!-- 富文本 -->
				<div class="richContent" v-if="detail.content" v-html="detail.content">
					
				</div>
			</div>
		</div>
		
		<!-- <div class="artHeaderCont">
            <div class="artImg" id="video_wrapper" @click="playVideoFun()" ref="video_wrapper"><img src="http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg" alt=""><div class="videoButton"><div class="mask"></div><span></span><i class="iconfont playIcon videoPlayIcon">&#xe640;</i></div></div>

        </div> -->
		<default-image :showImg="showDefault"></default-image>
	</div>
</template>

<script>
	import "@/assets/css/pages/information/informationDetail.scss";
	import playVideo from "@/assets/js/videoTemplate/playVideo.js";
	import pageTitle from '@/components/common/pageTitle'; //vue在webpack.base.conf.js文件中有如下配置， '@': resolve('src'),所以该处用艾特指src目录
	import defaultImage from '@/components/common/defaultImage'
	import wx from 'weixin-js-sdk';
	export default {
		components: {
			pageTitle,
			defaultImage
		},
		data() {
			return {
				imgPoster:null,//预览图
				buttonShow:false,//视频播放按钮显示隐藏
				videoShow:false,//视频显示隐藏
				videoUrl:"",//视频地址
				headerSetting: { //头部的设置参数
					needProcessSelf: "right",
					needBorder:true,
				},
//				playerOptions: {
//					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
//					sources: [{
//						type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
//						src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // url地址
//					}],
//					poster: 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg', // 你的封面地址
//
//				},
				articleId: '', //文章id
				titleName: '', //标题名字，资讯列表跳转=资讯详情，管理人详情列表=详情，进入页面需要传参
				detail: {}, //接口返回详情数据

				articleId:'', //文章id
				titleName:'资讯详情', //标题名字，资讯列表跳转=资讯详情，管理人详情列表=详情，进入页面需要传参
				detail:{}, //接口返回详情数据
				showDefault:false, //无数据状态
				isShare:true, //是否可转发
				shareParams:{},//转发分享的参数
			}
		},
		computed: {
//			player() {
//				return this.$refs.videoPlayer.player
//			}
		},
		created() {
			let that = this
			let query = this.$route.query
			that.articleId = query.articleId //跳转页面传参获取
			if(query.titleName){ //如果设定了标题名就取，否则取固定的
				that.titleName = query.titleName
			}
			if(query.isShare == "1"){
				that.isShare = false
			}
		},
		mounted() {
			let that = this
			
			// that.playVideoFun()
			that.getInitDetail()
//			that.impPoster = "http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg"
//			this.$refs.video_wrapper_img.attr("src", "http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg")
		},
		methods: {
			// 获取资讯详情
			getInitDetail() {
				let that = this
				that.showDefault = false
				that.imgPoster = "http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg"
				that.$axiosHttp.http({
					url: that.$httpConfig.informationUrl,
					data: {
						id:that.articleId ||''
					},
					method: "POST"
				},res => { //接口成功0000
					that.detail = res.data
					that.weixinShare()
					//如果视频路径不为空的话则显示播放按钮，给图片赋值视频地址
                    if (that.detail.videoList.length != 0) {

//         				显示播放按钮
                        that.buttonShow = true;
                        //显示视频
                        that.videoShow = true;
						
                        //视频路径
                        that.videoUrl = that.detail.videoList[0].data;
                    }
				},res => { // 接口错误4000
					
					// that.$loading.hide();	
				},res => { // 接口返回1000
					that.showDefault = true
					that.$loading.hide();
				})
			},
			
			playVideoFun() {
				let that = this
				//调用视频播放
				playVideo(that.videoUrl, "video_wrapper");
				// mui("body").on('mdClick', '.artImg', function() {
				// 	playVideo('https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',"video_wrapper");
				// });
			},
			// 分享 
			headerClickCallBack(type){
				let detail = this.detail
				this.shareParams = {
					"title": detail.title || '--', //标题
					"coverImageUrl": detail.coverImageUrl || '--', //封面预览图
					"digest": detail.digest || '--', // 详情
					"outUrl": this.$urls.domain+'/informationDetail.html', // 链接
				}
				console.log('分享资讯',this.$urls.domain)

				this.$urls.routerPush(this, this.$urls.shareInformation, this.shareParams, true)
				// if( window.appIsIOS ){
				// 	window.webkit.messageHandlers.wxShare.postMessage(JSON.stringify(obj))
				// }else{
				// 	window.jsObj.wxShare(JSON.stringify(obj))
				// }
			},
		/**
         * weixinShare 微信分享设置
         */
        weixinShare() {
            var that = this;

            wx.showMenuItems({
                menuList: [
                    'menuItem:share:appMessage',
                ],
                success: function(res) {},
                // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });

            //分享给朋友
            wx.onMenuShareAppMessage({
                title: that.shareParams.title, // 分享标题
                desc: that.shareParams.digest, // 分享描述
                link: that.shareParams.outUrl, // 分享链接
                imgUrl: that.shareParams.coverImageUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    //隐藏分享提示浮层
                    // $('.tipMask').hide();
                },
                fail: function() {
                    // $('.tipMask').hide();
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    //隐藏分享提示浮层
                    // $('.tipMask').hide();
                }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: that.shareParams.title, // 分享标题
                link: that.shareParams.outUrl, // 分享链接
                imgUrl: that.shareParams.coverImageUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    // //隐藏分享提示浮层
                    // $('.tipMask').hide();
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    // //隐藏分享提示浮层
                    // $('.tipMask').hide();
                }
            });
        },
			
		}

	}
</script>

<style>

</style>