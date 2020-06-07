// import $ from 'jquery'

//接口路径  默认配置一个api
var urlWebhttp ="/web";
var urlApphttp = "/app"


var type = "POST";

var urlStrs = {
    // 登录
    loginUrl: urlWebhttp + '/account/frontend/loginCheck',
    // 任务管理首页-列表
    managementListUrl: urlWebhttp + '/task/v3.3.5/list',

    // ---------  我的 邀请好友 ---------

    // 老带新，微信邀请好友
    oldRecommendNewUrl: urlWebhttp + '/account/oldRecommendNew',
    // 查询用户基本信息
    UserBaseInfoUrl: urlWebhttp + '/account/queryUserBaseInfo',
    // 查询用户全部信息
    getUserInfoUrl: urlWebhttp + '/account/getUserInfo',
    //会员俱乐部-立即报名
    activityApplyUrl : urlWebhttp + '/marketing/activityApply',
    // 获取理财师列表
    custBroUrl: urlWebhttp + '/account/custBroRelQuery',
    // 获取微信分享内容
    shareContentUrl: urlWebhttp + '/content/frontend/findContentByCategory',
    // 权益详情页
    membershipDetailUrl: urlWebhttp + '/content/findBenefitByLevel',

    // ---------- 我的 协议 ----------

    // 隐私协议、服务协议
    aboutProtocolUrl: urlWebhttp + '/content/frontend/findInvestorClassification',
    pdfDownloadUrl: urlWebhttp + '/content/file/frontend/mount/download',

    // ---------- 理财 ------------

    // 管理人详情
    managerDetailUrl: urlWebhttp + '/content/frontend/zt/manager/detail',
    // 获取所有版块内容
    platesListUrl: urlWebhttp + '/content/frontend/zt/manager/plates',
    // 根据版块id获取专门板块的内容
    managerArticleUrl: urlWebhttp + '/content/frontend/zt/manager/article',

    /************************       账户 start     *******************/
    
    queryFinancialerUrl: urlWebhttp + '/account/home/frontend/queryFinancialer',
    
    /************************       账户 end     *******************/

    
    /************************       发现 start     *******************/
    // 查询单条文章(APPCMS后台)
    getArticleUrl: urlWebhttp + '/content/frontend/getArticle',
    // 视频医生校验
    checkVideoDoctorUrl: urlWebhttp + '/account/checkVideoDoctor',
    // 城市列表
    cityList_api:urlWebhttp+'/marketing/frontend/cityList',
    /************************       发现 end     *******************/
   
    /************************       资讯start     *******************/
    // 资讯详情页（股份app）
    informationUrl: urlWebhttp + '/content/frontend/findDetail',
    /************************       资讯 end     *******************/
   
   


    /************************       会员活动列表与详情 start     *******************/

    getActivitiesListUrl : urlWebhttp + '/marketing/frontend/getActivitiesList', //会员俱乐部-活动列表
    getDetailActivityUrl : urlWebhttp + '/marketing/frontend/getDetailActivity', //会员俱乐部-活动详情
    activityApplyUrl : urlWebhttp + '/marketing/activityApply', //会员俱乐部-立即报名
    shareInfoUrl : urlWebhttp + '/marketing/frontend/shareInfo', //会员俱乐部-分享给好友
    cityListUrl : urlWebhttp + '/marketing/frontend/cityList',  // 会员俱乐部-城市列表
    getCityUrl : urlWebhttp + '/marketing/frontend/getCity', //会员俱乐部-获取当前选择城市
    /************************       会员活动列表与详情 end     *******************/
}
export  default urlStrs

