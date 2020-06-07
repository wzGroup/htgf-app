<!--
    会员活动详情
    @Author：史芸瑞
    @Date：2020-5-26
 -->

<template>
  <div id="activityDetailsBox">
    <page-title title="活动详情"></page-title>
    <normal-dialog
      :title="dialogTitle"
      :content="dialogContent"
      :show="dialogShow"
      :buttons="buttons"
      @dialogClick="dialogClick"
    ></normal-dialog>

    <div class="bgBox">
      <img id="bgimg" class="lazyload" :src="imgUrl" />
      <span class="livePlayback" style="display:none" v-if="data.isPlayback">观看回放</span>
    </div>

    <div class="activityDetailsBox">
      <div class="activityDetailsTopBox">
        <h3 class="actName">{{data.actName}}</h3>
        <div class="activityDetailsDivBox" v-if="data.actCity">
          <p>
            <i class="locationIcon"></i>
            <span>活动举办城市:</span>
          </p>
          <p class="city">{{currentCity}}</p>
        </div>
        <div class="activityDetailsDivBox notOnline" v-if="!data.actForm">
          <p>
            <i class="activityTimeIcon"></i>
            <span>活动时间:</span>
          </p>
          <p class="startTimeOrendTime">{{data.actStartDateStr + '-' + data.actEndDateStr}}</p>
        </div>
        <div class="activityDetailsDivBox online" v-if="data.actForm">
          <p>
            <i class="activityTimeIcon"></i>
            <span>直播时间:</span>
          </p>
          <p class="startTimeOrendTime">{{data.actPlayTimeMark}}</p>
        </div>
      </div>
      <div class="activityIntroduceBox">
        <h4>活动介绍</h4>
        <div class="activityIntroduce">{{data.actIntroduce}}</div>
      </div>
    </div>

    <div class="activityBottomBox">
      <a
        href="javascript:void(0);"
        :class="{'disabled': btnIsDisabled}"
        @click="getUserInfo"
      >{{actStatusText}}</a>
    </div>

    <!-- 奖励弹框 -->
    <div class="mask"></div>
    <div class="successBigCon" id="oldToNewPrizesw" v-show="dialogSetting.dialogShow">
      <div class="successBox">
        <!-- 标题 -->
        <div class="successTit">{{successTit}}</div>
        <!-- 奖品名称 -->
        <div class="prizeName" v-show="dialogSetting.prizeName">{{dialogSetting.prizeName}}</div>
        <!-- 邀请好友 -->
        <div class="shareTip clearfix" v-show="dialogSetting.isShare">
          <span></span>
          <p>邀请新好友获得更多奖励</p>
          <span></span>
        </div>
        <!-- 邮寄提示 -->
        <div class="postTip" v-show="dialogSetting.postTip">{{dialogSetting.postTip}}</div>
        <!-- 分享按钮 -->
        <div class="hideBox" v-show="dialogSetting.url">
          <div class="successBoxButton">
            <div
              class="shareBtn goldRedBgButton toLink"
            >{{dialogSetting.actForm == 0? "进入直播间": "确定"}}</div>
            <div class="shareBtn goldRedBgButton toShareStyle toShare">分享</div>
          </div>
        </div>
        <!-- 上方黄色大按钮 -->
        <div
          class="shareBtn goldRedBgButton toShare hideBtn"
          v-show="!dialogSetting.url"
        >{{dialogSetting.firstBtnText}}</div>
        <!-- 查看奖励 -->
        <a
          href="javascript:void(0);"
          class="seePrize rewards"
          v-show="dialogSetting.isSecondBtn"
        >查看奖励></a>
      </div>
      <span class="iconfont closeBtn">&#xe637;</span>
    </div>
    <!-- 奖励弹框 -->
  </div>
</template>
 
<script>
import pageTitle from "@/components/common/pageTitle";
import normalDialog from "@/components/common/dialog";

import "@/assets/css/pages/memberClub/memberActivitiesDetail.scss";
import img from "@/assets/img/top_banner.png";
export default {
  components: { pageTitle, normalDialog },
  data() {
    return {
      actType: "", //活动类型
      actId: "", //活动ID
      data: {}, //接口返回的数据
      userModel: {}, //查询到的用户信息bean
      isNeedLogin: 0,
      appNewWebView: 1,
      buttons: [], //温馨提示弹框下方的按钮列表
      dialogContent: "", //弹框显示的内容
      dialogTitle: "温馨提示", //弹框显示的title
      btnIsDisabled: true, //下方按钮是否可被点击 默认可以被点击
      dialogType: "0", //弹框的样式 默认为正常弹框

      dialogSetting: {
        //获奖弹框的设置项目
        successTit: "恭喜您报名成功", //上方文案
        dialogShow: false, //弹框是否显示
        actForm: "", //播放类型
        url: "", //跳转的链接
        prizeName: "", //奖品名称
        isShare: false, //是否为老带新分享
        postTip:
          "*请您保持手机畅通，我们工作人员将与您联系并给您邮寄奖品，谢谢您的参与*", //邮寄提示
        firstBtnText: "查看奖励", //上方大按钮文案
        isSecondBtn: false, //下方小按钮是否显示

        actForm: "", //是否为直播 0直播
        type: ""
      }
    };
  },
  created() {
    this.actType = this.$route.query.actType;
    this.actId = this.$route.query.actId;
    this.isNeedLogin = this.$route.query.isNeedLogin;
    this.appNewWebView = this.$route.query.appNewWebView;
    this.getData();
  },
  methods: {
    //dialog中button的点击事件 param1：name为点击按钮的文字
    dialogClick(name) {
      this.dialogShow = false; //将弹框隐藏
      window.location.href =
        this.data.successPage + "?isHtOuterLinkUniqueIdentification=true"; //跳转到目标页面
    },
    chanageActStatusText() {
      this.actStatusText = "已报名";
    },
    //获取活动详情
    getData() {
      let that = this;
      this.$axiosHttp.http(
        {
          url: this.$httpConfig.getDetailActivityUrl,
          data: {
            actType: this.actType, //活动类型
            actId: this.actId, //活动id
            isNeedLogin: this.isNeedLogin
          }
        },
        res => {
          // that.data = res.data;
          // //数据处理逻辑放在computed中

          //text
          const json = `
            {
              "status":0,
              "message":"处理成功！",
              "data":{
                  "actType":"1",
                  "actId":"100000",
                  "actName":"女性婚姻财富保全与花艺沙龙",
                  "actTag":"1111",
                  "actProvince":"1111",
                  "actProvinceNO":"1111",
                  "actCity":"北京市",
                  "actCityNO":"1111",
                  "actStartDate":"123565434",
                  "actStartDateStr":"2019-05-03",
                  "actEndDate":"124565453432324",
                  "actEndDateStr":"2019-06-30",
                  "actIntroduce":"通过邀请客户参加高端红酒活动，从而为客户带来不一样的活动体验并对公司留下深刻印象，品尝全酒宴，满足客户体验，增加客户与理财师交流，对于客户增信、签单有很大的促进作用11",
                  "signUpFlag":false,
                  "actStatus":-1,
                  "domainIP":"http://172.16.163.99:85/",
                  "htjfGeneralizeImgUrl":"",
                  "htjfGeneralizeImgUrlPrex":"",
                  "successPage":"www"
              }
            }
          `;
          this.data = JSON.parse(json).data;
        }
      );
    },
    //点击立即报名时请求个人用户信息接口
    getUserInfo: function() {
      let that = this;
      this.$axiosHttp.http(
        {
          url: this.$httpConfig.getUserInfoUrl,
          data: {
            hmac: "", //预留的加密信息
            params: {}
          }
        },
        res => {
          that.userModel = res.data;
          console.log(that.userModel);

          that.queryFinan();
        }
      );
    },
    //明星理财师列表
    queryFinan: function() {
      let that = this;
      this.$axiosHttp.http(
        {
          url: this.$httpConfig.queryFinancialerUrl,
          data: {
            pageNum: 1, //非必须，默认为1
            pageSize: 10 //非必须，默认为10
          }
        },
        res => {
          that.signUp();
        },
        error => {
          //弹框提示用户绑定理财师
          that.title = "参加活动，需绑定理顾";
          that.dialogContent = "即将打开恒天财富APP，绑定理顾。";
          that.buttons = ["取消", "允许"];
          that.dialogType = "1";
          that.dialogShow = true;
        }
      );
    },
    //立即报名
    signUp: function() {
      let that = this;
      this.$axiosHttp.http(
        {
          url: this.$httpConfig.activityApplyUrl,
          data: {
            type: that.actType, //活动类型，1-线上 2-线下
            custType: that.userModel.accountType, //客户类型 0 - 机构 1-个人
            custCode: that.userModel.customerNo, //客户编号
            activityId: that.actId //活动id
          }
        },
        res => {
          let that = this;
          that.btnIsDisabled = true;
          that.actStatusText = "已报名";
          debugger;
          successTitle = res.message;
          let data = res.data;
          if (that.gV.actType == 1) {
            //线上活动
            if (data.data.actStyle == 4) {
              //是老带新
              if (data.data.brandPrizeVo.isHave == 0) {
                //没有奖品
                that.dialogSetting.url = data.url;
                that.dialogSetting.prizeName = ""; //没有奖品
                that.dialogSetting.firstBtnText = "我知道了"; //下方发按钮文案
                that.dialogSetting.dialogShow = true;
              } else if (data.data.brandPrizeVo.isHave == 1) {
                //有奖品
                if (data.brandPrizeVo.prizeType == 1) {
                  //实物
                } else if (data.brandPrizeVo.prizeType == 2) {
                  //虚拟
                }
                //有奖品
                that.dialogSetting.url = data.url;
                that.dialogSetting.prizeName = data.prizeName; //奖品描述
                that.dialogSetting.isShare = false; //展示 宴请好友获得更多奖励
                that.dialogSetting.firstBtnText = "查看奖励"; //下方发按钮文案
                that.dialogSetting.isSecondBtn = false; //下方查看奖励按钮
                that.dialogSetting.dialogShow = true;
              }
            } else {
              //非老带新
              if (data.data.brandPrizeVo.isHave == 0) {
                //没有奖品
                that.dialogSetting.url = data.url;
                that.dialogSetting.prizeName = ""; //奖品描述
                that.dialogSetting.isShare = false; //展示 宴请好友获得更多奖励
                that.dialogSetting.firstBtnText = "我知道了"; //下方发按钮文案
                that.dialogSetting.postTip =
                  "稍后您的理财师将会与您沟通具体活动事宜，请保持手机畅通"; //提示文案
                that.dialogSetting.isSecondBtn = false; //下方查看奖励按钮
                that.dialogSetting.dialogShow = true;
              } else if (data.data.brandPrizeVo.isHave == 1) {
                //有奖品
                if (data.brandPrizeVo.prizeType == 1) {
                  //实物
                } else if (data.brandPrizeVo.prizeType == 2) {
                  //虚拟
                }
                that.dialogSetting.url = data.url;
                that.dialogSetting.prizeName = data.prizeName; //奖品描述
                that.dialogSetting.isShare = false; //展示 宴请好友获得更多奖励
                that.dialogSetting.firstBtnText = "查看奖励"; //下方发按钮文案
                that.dialogSetting.isSecondBtn = false; //下方查看奖励按钮
                that.dialogSetting.dialogShow = true;
              }
            }
          } else if (that.gV.actType == 2) {
            //线下活动
            that.successNoConOpen(successTitle);

            that.dialogSetting.url = "";
            that.dialogSetting.prizeName = data.prizeName; //奖品描述
            that.dialogSetting.isShare = false; //展示 宴请好友获得更多奖励
            that.dialogSetting.firstBtnText = "查看奖励"; //下方发按钮文案
            that.dialogSetting.isSecondBtn = false; //下方查看奖励按钮
            that.dialogSetting.dialogShow = true;
          }
        },
        errRes => {
          //失败回调
          debugger;
          let data = errRes.data;
          that.btnIsDisabled = true;
          if (data.status == "20003") {
            //需要风测
            that.title = "参加活动，需要风险测评";
            that.dialogContent = "即将打开恒天财富APP，进行风险测评。";
            that.buttons = ["取消", "允许"];
            that.dialogType = "1";
            that.dialogShow = true;
          } else if (data.status == "20010") {
            if (!that.gV.idnoCheckflag) {
              //需要进行合格投资者信息认证
              that.title = "参加活动，需要合格投资者认证";
              that.dialogContent = "即将打开恒天财富APP，进行合格投资者认证。";
              that.buttons = ["取消", "允许"];
              that.dialogType = "1";
              that.dialogShow = true;
            } else {
              //去实名
              that.title = "温馨提示";
              that.dialogContent = data.message;
              that.buttons = ["取消", "实名认证"];
              that.dialogType = "1";
              that.dialogShow = true;
            }
          } else if (data.status == "20005") {
            //需要进行合格投资者信息认证
            that.title = "参加活动，需要合格投资者认证";
            that.dialogContent = "即将打开恒天财富APP，进行合格投资者认证。";
            that.buttons = ["取消", "允许"];
            that.dialogType = "1";
            that.dialogShow = true;
          } else if (data.status == "20011" || data.status == "20016") {
            //客户未成交
            var obj = {
              title: "温馨提示", //如果不传，默认不显示标题
              p: "<p>" + data.message + "</p>",
              yesTxt: "查看产品",
              celTxt: "取消",
              hideCelButton: false,
              zIndex: 100,
              needYesHref: true, //是否需要把确定按钮改成a标签，默认false
              yesHref: site_url.wealthIndex_url, //确定按钮a链接的默认href
              htmdEvtYes: "activityDetails_18", // 埋点确定按钮属性
              htmdEvtCel: "activityDetails_19", // 埋点取消按钮属性
              callback: function(t) {}
            };
            $.elasticLayer(obj);
          } else if (data.status == "20007") {
            //去实名
            that.title = "温馨提示";
            that.dialogContent = data.message;
            that.buttons = ["取消", "实名认证"];
            that.dialogType = "0";
            that.dialogShow = true;
          } else if (data.status == "10003") {
            //重复报名--已报名
            that.title = "温馨提示";
            that.dialogContent = "不可重复报名";
            that.buttons = ["我明白了"];
            that.dialogType = "0";
            that.dialogShow = true;
          } else if (data.status == "20013") {
            //老客户 todo
            that.oldToNewTip("您已经是恒天财富的老会员啦！");
          } else if (data.status == "20014" || data.status == "20015") {
            // 新客户，但没有邀请人 || 新客户，有邀请人且超过8个人  todo
            that.oldToNewTip("恭喜您注册成为恒天财富会员！");
          } else if (data.status == "4009") {
            //重复报名--已报名
            that.title = "温馨提示";
            that.dialogContent = "抱歉，服务器异常";
            that.buttons = ["我明白了"];
            that.dialogType = "0";
            that.dialogShow = true;
          } else {
            if (!!data.message) {
              that.title = "温馨提示";
              that.dialogContent = data.message;
              that.buttons = ["我明白了"];
              that.dialogType = "0";
              that.dialogShow = true;
            } else {
              tipAction("系统开小差啦，请联系客服 400-8980-618");
            }
          }
        },
        noDataMsg => {}
      );
    },
    //分享给好友
    shareInfo: function() {
      var that = this;
      var obj = [
        {
          url: site_url.shareInfo_api,
          data: {
            actType: that.gV.actType, //活动类型
            actId: that.gV.actId, //活动id
            shareCustCode: that.gV.custCode //分享客户编号
          },
          //async: false,
          needDataEmpty: true,
          callbackDone: function(json) {
            var data = json.data;
            var wxShare = {
              type: "auto",
              businessType: "activityShare", //业务类型
              title: that.$e.actName.text(),
              des: "新老朋友，共享精彩",
              link: data,
              img: that.$e.bgimg.attr("data-original")
            };
            // window.isAndroid是在root文件中定义的变量
            // if (window.currentIsApp) {
            if (window.isAndroid) {
              //这个是安卓操作系统
              window.jsObj.wxShare(JSON.stringify(wxShare));
            }
            // window.isIOS是在root文件中定义的变量
            if (window.isIOS) {
              //这个是ios操作系统
              window.webkit.messageHandlers.wxShare.postMessage(
                JSON.stringify(wxShare)
              );
            }
            // }
          }
        }
      ];
      $.ajaxLoading(obj);
    }
  },
  computed: {
    //活动图片处理
    imgUrl() {
      if (this.data.htjfGeneralizeImgUrl) {
        //展示活动图片
        return (
          this.data.domainIP +
          this.data.htjfGeneralizeImgUrlPrex +
          this.data.htjfGeneralizeImgUrl
        );
      }
      return img;
    },
    //活动类型处理
    actStatusText() {
      let text = "";
      if (this.data.actStatus == 0) {
        text = "敬请期待";
      } else if (this.data.actStatus == 1) {
        // 进行中的活动已报名
        if (this.data.signUpFlag) {
          text = "已报名";
        }
      } else if (this.data.actStatus == 2) {
        text = "已结束";
      } else if (this.data.actStatus == 3) {
        text = "已删除";
      } else {
        this.btnIsDisabled = false;
        text = "立即报名";
      }
      return text;
    },
    //城市处理
    currentCity() {
      let text = "";
      //如果省市一致 只显示市 如果省市不一致 显示省+市
      if (this.data.actProvince !== this.data.actCity) {
        text = this.data.actProvince + this.data.actCity;
      } else {
        text = this.data.actCity;
      }
      return text;
    },
    //已报名活动弹框是否显示
    dialogShow() {
      if (this.data.actForm == 0) {
        this.buttons = ["进入直播间"];
      } else {
        this.buttons = ["确定"];
      }
      return this.data.signUpFlag && this.data.successPage;
    }
  }
};
</script>