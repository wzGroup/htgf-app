//h5info 信息

//获取地址栏参数
getQueryString = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return '';
};

h5Info = function(href, type, htmdEvt, eTarget){
	var h5_info,
		$e = $(eTarget);
	// 点击事件自定义埋点info
	if(type == "click"){

	} else {// 非点击情况（页面加载和退出）自定义埋点info
		// 产品详情 项目id_项目名称
		if ( href.includes('/articlePage') ){
			// h5_info = '测试下'
		}
	}
	h5_info = (h5_info ? h5_info : '');
	return h5_info;
}

module.exports = h5Info;