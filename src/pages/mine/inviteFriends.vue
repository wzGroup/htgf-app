<!--
    邀请好友页面
    @Author：bashuang
    @Date：20200525
 -->
<template>
  <div class="friend-box">
    <!-- 返回按钮 -->
    <!-- 标题 -->
    <page-title id="pageTitle" title="">
    </page-title>
    <!-- <img class="close-friend" @click="closePage()" src="../../assets/img/icon_fanhui.png" alt=""> -->
    <!-- 卡片 -->
    <div class="bg-card">
      <!-- 姓名 -->
      <div class="you-name"><span v-if="beseInfo">{{beseInfo.name}}</span></div>
      <!-- 邀请好友，分享精彩 -->
      <div class="share-intro">邀请好友，分享精彩</div>
      <!-- 二维码 -->
      <div class="share-code">
        <div id="qrcode" ref="qrCodeUrl" v-show="isShowCode"></div>
      </div>
      <div class="bottom-label" v-if="blueLabel">
        <span class="money-name" v-if="isShowCode">您的理财师：{{managerName.codeName}}{{managerName.empNo}}</span>
        <span class="choose-btn"  v-if="isChoose" @click="isChoose&&switchManager()" >点击切换理财师
          <img class="more-img" src="../../assets/img/icon_more.png" alt="">
        </span>
      </div>
      <div class="bottom-div" v-else></div>
    </div>
    <!-- 分享按钮 -->
    <div class="share-button">
      <div class="pyq-btn" @click="checkShare && goToShare('wechatMoments')">
        <img src="../../assets/img/icon_pyq.png" alt="">
        <span>分享到朋友圈</span>
      </div>
      <div class="line"></div>
      <div class="wechat-btn" @click="checkShare && goToShare('friends')">
        <img src="../../assets/img/icon_wechat.png" alt="">
        <span>分享给好友</span>
      </div>
    </div>
    <!-- 理财师选择列表，点击切换理财师时显示 -->
    <ul class="manager-wrap" v-if="isShowList">
      <li class="manager-list" v-for="(item,index) in managerList" :key="index" @click="chooseManager(item)" >
        <div class="border-top" v-if="index!=0"></div>
        <span class="manager">{{item.name}}</span>
        <span class="job-number">{{item.number}}</span>
      </li>
      <li class="manager-list"></li>
      <li class="cancel" @click="cancel()">取消</li>
    </ul>
    <div class="mask" v-if="isShowList" @click="cancel()"></div>
  
  </div>
</template>
<script>
import pageTitle from '@/components/common/pageTitle'
import { Toast } from "mint-ui";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      beseInfo:null,//用户基础信息，从getBeseInfo获取
      isShowCode:false, //是否显示二维码框
      isShowList: false, //是否显示可选择的理财师列表
      isChoose:false, //是否可点击选择理财师
      blueLabel:false, //是否显示蓝色标签
      managerList: [], //理财师列表
      managerName: {}, //已选理财师-姓名和工号
      aesEncrypt:null, //分享加密串
      shareUrl:"",//分享链接
      isAndroid:false, //是否是安卓
      isiOS:false, //是否是ios
      wxShareContent:{}, //分享微信的内容(标题、描述图片等等)
      checkShare:false, //是否可以点击分享
    };
  },
  components: {pageTitle},
  created(){
    let that = this
    that.getBeseInfo()
  },
  mounted() {
    // 判断是安卓还是ios
		let u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },
  methods: {
    // 获取用户基本信息
    getBeseInfo() {
      let that = this;
      that.$axiosHttp.http({
          url: that.$httpConfig.UserBaseInfoUrl,
          params: {},
          method: "POST"
        }, res => { //接口成功0000
          that.beseInfo = res.data //用户信息赋值
          that.checkRealName()
        }, res => {
          // 接口错误4000
         
        }, res => {
          // 接口返回1000
          that.blueLabel = false
          that.isShowCode = false
        }
      );
    },
    // 1、先判断是否已实名认证，如果未实名认证，不展示用户信息
    checkRealName() {
      let that = this;
      console.log('that.managerName.empNo',that.managerName.empNo)
      that.$axiosHttp.http({
          url: that.$httpConfig.oldRecommendNewUrl,
          // params: that.managerName.empNo || '', //理财师工号
          method: "POST"
        }, res => { //接口成功0000
          let data = res.data
          if (data.recommendable == 1) { 
            //未实名认证，提示去认证
            that.isShowCode = false
            that.blueLabel = true
            that.$toast({
              message: '完成实名认证后才可以推荐好友哦',
              className: 'toast'
              })
            let timer;
            if (timer) {
              clearTimeout(timer)
            }
            timer = setTimeout(() => { //未实名认证的，3秒后关闭页面
              timer = null
              that.closePage()
            }, 3500)
          } else {
            // 已实名认证
            that.isShowCode = true
            // that.blueLabel = true
            that.aesEncrypt = data.aesEncrypt;
            //拼分享出去的链接+客户编号+选择的理财师编号
            that.shareUrl = that.$urls.activeUrl + "&shareCustomerNo=" + that.beseInfo.customerNo + "&shareEmpCode=" + that.managerName.empNo;
            // console.log(that.shareUrl)
            // 获取理财师列表
            that.getCustList()
            // 获取微信分享信息接口
            that.getshareContent()
            // 生成二维码
            that.createQRcode();
          }
        }, res => {
          // 接口错误4000
         
        }, res => {
          // 接口返回1000;
          that.blueLabel = false
          that.isShowCode = false
        }
      );
    },
    // 获取理财师列表
    getCustList() {
      let that = this;
      that.$axiosHttp.http({
          url: that.$httpConfig.custBroUrl,
          data: {
            fundType: "0"
          },
          method: "POST"
        }, res => { //接口成功0000
          let data = res.data
          let existMain = data.existMain
          that.managerList = data.advisor
          that.blueLabel = that.managerList && that.managerList.length>0 ? true :false
          if (existMain == 0 && that.managerList.length > 1) {
            that.isChoose = true;
          }else if(that.managerList.length = 1){
            that.managerName = that.managerList[0]
            that.isChoose = false
          }
        }, res => {
          // 接口错误4000
          // that.boxText = res.data.message ? res.data.message : "系统开小差啦，请联系系统管理员";
          // that.dialogShow = true
          
        }, res => { 
          // 接口返回1000
          that.blueLabel = false //没有理财师，蓝色标签不显示
          that.isChoose = false
        }
      );
    },
    // 获取微信分享内容接口
    getshareContent() {
      let that = this;
      that.checkShare = false
      that.$axiosHttp.http({
          url: that.$httpConfig.shareContentUrl,
          params: {
            category: "appShareOldAndNew", //类型（标志位）
            groupType: '', //组类型
            curPage: "1", //当前页
            pageSize: "1" //每页记录数
          },
          method: "POST"
        }, res => { //接口成功0000
          that.wxShareContent = res.data.pageList[0]
          that.checkShare = true
        }, res => {
          // 接口错误4000
          // that.boxText = res.data.message ? res.data.message : "系统开小差啦，请联系系统管理员";
          // that.dialogShow = true
        }, res => {
          // 接口返回1000
        }
      );
    },
    // 分享（type=1点击分享朋友圈   ，type=2点击分享给好友）
    goToShare(type){
      let that=this
      let obj={
        'type': type,     // auto 原生自己分享框  wechatMoments 朋友圈   friends 朋友
        'businessType': 'ldx',   //life,业务类型
        'title': that.wxShareContent.title ? that.wxShareContent.title:"",    //标题
        'des':'邀请好友，分享精彩',   //简介
        'link': that.shareUrl ? that.shareUrl:'',   //链接
        'img':that.wxShareContent.imageUrlApp?that.wxShareContent.imageUrlApp:"",   // 图标
      }
      console.log("分享",obj)
      this.$urls.routerPush(that, that.$urls.inviteFriendsShare,obj, true)
      // if(that.isAndroid){ //如果安卓手机用原有方法，如果是苹果则使用wk
      //   window.jsObj.wxShare(JSON.stringify(obj))
      // }else{
      //   window.webkit.messageHandlers.wxShare.postMessage(JSON.stringify(obj))
      // }
    },
    // 点击关闭页面
    closePage() {
      if (this.isAndroid) {
        //这个是安卓操作系统
        window.jsObj.backNative();
      }
      if (this.isiOS) {
        //这个是ios操作系统
        window.webkit.messageHandlers.backNative.postMessage('backNative');
      } 
    },
    // 点击切换理财师，弹出理财师弹框
    switchManager() {
      this.isShowList = true;
    },
    // 点击选择理财师
    chooseManager(item) {
      this.managerName = item; //点击的理财师显示在蓝色标签上
      this.isShowList = false;
    },
    //点击取消，关闭理财师选择列表
    cancel() {
      this.isShowList = false;
    },
    // 生成二维码
    createQRcode() {
      let that=this
      if(!that.shareUrl) return
      let qrcode = new QRCode(that.$refs.qrCodeUrl, {
        text: that.shareUrl, // 需要转换为二维码的内容
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
   
  }
};
</script>

<style lang="scss" spoced>
.friend-box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  background: url("../../assets/img/friend_bg.png") no-repeat center;
  background-size: 100% 100%;
  .pageTitle{
    margin-bottom: .94rem;
  }
  .left{
    color: #ffffff
  }
  .pTitle{
    background: transparent;
    border: none
  }
  /* 关闭页面按钮 */
  .close-friend {
    position: fixed;
    left: 0;
    top: 0;
    width: .88rem;
    height: 0.88rem;
  }
  /* 卡片 */
  .bg-card {
    display: block;
    width: 6.2rem;
    /* height: 19.1rem; */
    background: url("../../assets/img/friend_card.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto 0.3rem;
    padding-top: 0.4rem;
    .you-name {
      height: 0.62rem;
      text-align: center;
      margin-bottom: .1rem;
      width: 100%;
      font-size: 0.44rem;
      line-height: 0.62rem;
      font-weight: 600;
      color:rgba(108,69,23,1);
      background: linear-gradient(
        239deg,
        rgba(187, 142, 95, 1) 0%,
        rgba(108, 69, 23, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .share-intro {
      width: 100%;
      font-size: 0.28rem;
      line-height: 0.4rem;
      height: 0.4rem;
      text-align: center;
      font-weight: 400;
      color: rgba(108, 69, 23, 1);
      margin-bottom: 0.3rem;
    }
    .share-code {
      width: 4.3rem;
      height: 4.3rem;
      /* background: #ffffff; */
      margin: 0 auto 0.54rem;
      position: relative;
      /* padding-top:.25rem; */
      box-sizing: border-box;
      #qrcode {
        display: inline-block;
        width: 100%;
        height: 100%;
        img {
          width: 4.3rem;
          height: 4.3rem;
          background-color: #fff; //设置白色背景色
          padding: 0.18rem; // 利用padding的特性，挤出白边
          box-sizing: border-box;
        }
      }
    }
    .bottom-label {
      width: 100%;
      height: 0.98rem;
      background: url("../../assets/img/bottom-label.png") no-repeat center;
      background-size: 5.86rem 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.16rem 0 0.14rem;
      font-size: 0.3rem;
      line-height: 0.3rem;
      .money-name {
        color: #fff9f2;
        display: inline-block;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      .choose-btn {
        margin-top: 0.1rem;
        display: flex;
        height: 0.264rem;
        color: #fff9f2;
        font-size: 0.24rem;
        /* line-height: .7rem; */
        align-items: center;
      }
      .more-img {
        display: inline-block;
        width: 0.264rem;
        height: 0.264rem;
      }
    }
    /* 底部空div */
    .bottom-div{
      height: 0.48rem;
    }
  }

  /* 分享按钮 */
  .share-button {
    width: 6.2rem;
    height: 1.8rem;
    background: url("../../assets/img/fenxiang_bg.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .line {
      width: 0.01rem;
      height: 0.54rem;
      background: #f5edd8;
      margin-top: 0.46rem;
    }
    img {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      margin: 0.36rem auto 0.1rem;
    }
    .pyq-btn {
      width: 3.1rem;
      height: 100%;
      > span {
        font-weight: 400;
        font-size: 0.28rem;
        color: rgba(255, 255, 255, 1);
        line-height: 0.4rem;
        text-shadow: 0px 1px 1px rgba(128, 81, 30, 1);
      }
    }
    .wechat-btn {
      flex: 1;
      > span {
        font-weight: 400;
        font-size: 0.28rem;
        color: rgba(255, 255, 255, 1);
        line-height: 0.4rem;
        text-shadow: 0px 1px 1px rgba(128, 81, 30, 1);
      }
    }
  }

  /* 理财师选择列表 */
  .manager-wrap {
    width: 100%;
    height: 7.84rem;
    background: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: auto;
    z-index: 10;
    /* 理财师列表 */
    .manager-list {
      padding-left: 0.3rem;
      width: 100%;
      height: 0.98rem;
      line-height: 0.98rem;
      .border-top {
        height: .01rem;
        background: #e7e9ed;
      }
      .manager {
        height: 0.4rem;
        font-size: 0.32rem;
        font-weight: 600;
        color: rgba(39, 39, 39, 1);
        line-height: 0.4rem;
        margin-right: 0.1rem;
      }
      .job-number {
        display: inline-block;
        padding: 0 0.1rem;
        font-size: 0.22rem;
        line-height: 0.3rem;
        color: #6c4517;
        background: linear-gradient(
          220deg,
          rgba(245, 236, 213, 1) 0%,
          rgba(240, 223, 186, 1) 100%
        );
      }
    }
    /* 取消按钮 */
    .cancel {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #f6f6f6;
      height: 0.98rem;
      z-index: 10;
      color: #272727;
      font-size: 0.32rem;
      font-weight: 400;
      line-height: 0.97rem;
      text-align: center;
    }
  }
  /* 黑色遮罩 */
  .mask {
    width: 100%;
    height: 13.34rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.6;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
  }
}
/* 弹出框 */
.toast{
  font-size: .28rem;
  display: inline-block;
  word-break: keep-all
}
</style>
