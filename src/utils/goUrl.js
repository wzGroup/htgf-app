/*
 * @page: 跳转原生url
 * @Author: yanruiting
 * @Date:   2020-06-01
 */

//公共参数 需要处理
var domain = window.location.protocol + "//" + window.location.host;

var urls = {
	//所有和App交互相关的协议都写在这里
	domain: window.location.protocol + "//" + window.location.host,
	/************************       发现 start     *******************/
	// 查看病历
	caseList: '/discovery/videoDoctor/caseList.html',
	// 呼叫医生
	callDoctor: '/discovery/videoDoctor/callDoctor.html',
	/************************       发现 end     *******************/
	
	/************************       资讯详情 start     *******************/
	// 分享资讯
	shareInformation: '/information/informationDetail/shareInformation.html',
	
	/************************       资讯详情 end     *******************/
	
	/************************       我的 start     *******************/
	// 邀请好友
	inviteFriendsShare: '/mine/inviteFriends/inviteFriendsShare.html',
	// 分享活动页面链接地址
	activeUrl:"https://wx.chtwm.com/api/brand/index.html?activityId=pWhA5xJTKF4Zfst%2B9ycHqQ%3D%3D&channel=3",
	
	/************************       我的 end     *******************/

	/************************       理财 start     *******************/
	// 理财跳转资讯详情页面地址
	gotoOutDetail: '/informationDetail',

	
	/************************       理财 end     *******************/



	//路由跳转的公共方法
	//param1: this
	//param2: 跳转的路径
	//param3: 需要传递的参数，如不需传递可不穿
	//param4: 是否需要app拦截处理，默认不需要
	routerPush: function(that, path, param = {}, needAppProcess = false){
		if (needAppProcess){
			//需要App处理，走协议流的形式去触发App的链接拦截
			//将参数对象转换成url参数的形式 并且拼接在url之后
			const url = "?" + Object.keys(param).map(key => 
				encodeURIComponent(key) + "=" + encodeURIComponent(param[key])).join("&")
			window.location.href = domain + path + url;
		} else {
			//不需要App处理，走路由切换，保证页面的流畅性。
			that.$router.push({path: path, query: param})
		}
	}
}

export  default urls