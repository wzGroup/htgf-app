<!--
    理财-理财师详情页面
    @Author：bashuang
    @Date：20200526
 -->
<template>
  <div class="manager-box">
    <!-- 标题 -->
    <page-title id="pageTitle" title="管理人详情" :headerSetting="headerSetting"></page-title>
    
    <!-- 卡片 -->
    <div class="card-box" v-if="!showDefault">
      <div class="card-wrap">
        <!-- 头像 -->
        <div class="head-img-wrap" v-if="managerDetail">
          <img class="head-img" v-if="logo" :src="managerDetail.logos[0]&&managerDetail.logos[0].url" alt="">
          <span class="head-img nomorl" v-else>{{managerNameFrist}}</span>
        </div>
        <!-- 右侧个人信息 -->
        <div class="right-name" v-if="managerDetail">{{managerDetail.managerName || '--'}}</div>
        <div class="introduce" v-if="managerDetail">{{managerDetail.digest || '--'}}</div>
        <!-- 虚线间隔线 -->
        <img class="dashed-line" src="@/assets/img/dashed_line.png" alt="">
        <!-- 下---名片信息 -->
        <ul class="card-message" v-if="managerDetail">
          <li class="message message1">备案：{{managerDetail.recordNum || '--'}}</li>
          <li class="message message2">成立日期：{{managerDetail.foundTime || '--'}}</li>
          <li class="message message3">管理规模：{{managerDetail.managerScale || '--'}}</li>
          <li class="message message4">核心策略：{{managerDetail.strategy || '--'}}</li>
        </ul>
      </div>
    </div>
    <!-- 标签列表tab -->
    <div class="switch-tab-wrap" v-if="!showDefault">
      <!-- 用于滚动，没有实际意义 -->
      <div ref="touchstone" id="touchstone"></div>
      <!-- 顶部标题 -->
      <div :class="[isSticky ? 'switch-tab-sticky stickyTab' : 'switch-tab-sticky']">
        <mt-tabbar v-model="tab" :class="isFixed ? 'switch-tab fixed-Tab' : 'switch-tab'">
          <mt-tab-item :id="index" @click.native="changeActive(item.id,index)" v-for="(item,index) in tabList" :key="index">{{item.name || '--'}}</mt-tab-item>
          <!-- <mt-tab-item id="manager-tab2" @click.native="changeActive('manager-tab2')">研究报告</mt-tab-item> -->
        </mt-tabbar>
      </div>
      <!-- 分类内容 mint-ui loadmore -->
        <mt-tab-container v-model="tab">
          <!-- 文章  富文本 -->
          <mt-tab-container-item :id="tab" class="containt-left" v-if="reportList && reportList.length == 1">
            <div v-if="!noData && reportList[0].content"></div>
            <!-- 默认图 -->
            <default-image imgTopStyle="margin-top:1.29rem" text="暂无内容" v-else></default-image>
          </mt-tab-container-item>
          <!-- 文章列表 -->
          <mt-tab-container-item :id="tab" class="containt-right" v-else>
              <mt-loadmore id='refresh' :top-method="loadTop" ref="loadmore1">
                  <div 
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loadComplete"
                    infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="30"
                    v-if="!noData">
                      <div class="report-list" v-for="(item,index) in reportList" :key="index" @click="gotoOutDetail(item)">
                        <div class="report-img"><img v-if="item.coverList" :src="item.coverList[1].url" alt=""></div>
                        <div class="report-tit">{{item.pageTitle || '--'}}</div>
                        <div class="report-time">{{item.updateTime || '--'}}</div>
                      </div>
                  </div>
                  <!-- 默认图 -->
                  <default-image imgTopStyle="margin-top:1.29rem" text="暂无内容" v-else></default-image>
                  <bottom-line v-if="bottomLine"></bottom-line>  
                  <!--显示上拉加载中状态-->
                  <load-more v-if="isLoading"></load-more>
              </mt-loadmore>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
    <default-image :showImg="showDefault"></default-image>
  </div>
</template>
<script>
import bottomLine from '@/components/common/bottomLine'
import pageTitle from '@/components/common/pageTitle'
import loadMore from '@/components/common/loadMore'
import defaultImage from '@/components/common/defaultImage'

export default {
  data() {
    return {
      headerSetting: { //头部的设置参数
        needProcessSelf: "left",
        needBorder:true,
      }, 
      logo:false, //是否有logo头像
      reportList:[], //板块列表
      isFixed:false,//是否固定tab的类名
      isSticky:false, //是否粘性定位的class
      isLoading:false, //上拉加载显示的加载圈显示
      loadComplete:false, //上拉加载已完成，或无更多数据
      bottomLine:false, //无数据底线
      noData:false, //接口无数据，显示无数据图片
      managerDetail:null, //管理人信息
      managerNameFrist:'', //没有头像的理顾的姓
      tabList:[], //板块标签列表
      tab:0, //标签索引
      pageNo:1, //管理人列表当前页码
      plateId:'', //板块id
      showDefault:false, //是否有详情
    };
  },
  components: {pageTitle,loadMore,bottomLine,defaultImage},
  mounted() {
    this.getManagerDetail()
    //判断苹果和安卓
    if( window.appIsIOS ){
      this.isSticky = true;
    }
    window.addEventListener('scroll', this.handleScroll, true);
  },
  // 销毁滚动实例
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    // 点击tab标签
    changeActive(id,index=0){
      let that = this
      that.bottomLine = false
      if(id){
        that.plateId = id
      }
      that.pageNo = 1
      that.tab = index
      that.isFixed = false;
      that.isSticky = false;
      that.getPlatesList()
    },
    // 获取管理人详情
    getManagerDetail(){
      let that = this
      that.$axiosHttp.http({
        url: that.$httpConfig.managerDetailUrl,
        params: {
          managerId: that.$route.query.managerId || '' //管理人id
        },
        method: "POST"
      },res => { //接口成功0000
        that.managerDetail = res.data
        if(that.managerDetail.logos.length == 0 && !that.managerDetail.logos.url){ //如果没有图片，则显示姓名首字母
          this.logo = false
          that.managerNameFrist = that.managerDetail.managerName ? that.managerDetail.managerName.substring(0,1) : ''
        }else{
          this.logo = true
        }
        this.getPlatesList("init") //有管理人数据后第一次请求板块列表
      },res => { // 接口错误4000

      },res => { // 接口返回1000
        this.showDefault = true
      })
    },
    /* 获取所有板块标签
    *   type="init",第一次调取所有板块信息，
    *  type="refresh", 获取列表数据为空时刷新列表
    */
    getPlatesList(type){
      let that = this
      that.$axiosHttp.http({
        url: that.$httpConfig.platesListUrl,
        params: {},
        method: "POST"
      },res => { //接口成功0000
        if(type=="init"){ //第一次请求板块下的信息，还没有点击的时候，选择第一个id
          that.tabList = res.data[0].children
          that.plateId = that.tabList[0].id //初始加载获取所有板块中第一个板块的id
          that.getPlateData('one')
        }else{
          that.getPlateData('one')
        }
        // this.changeActive()
      },res => { // 接口错误4000
        
      },res => { // 接口返回1000
      
      })
    },
    // 获取板块文章或列表 type=one第一次调用，more上拉加载调用
    getPlateData(type){
      let that = this
      if(that.bottomLine) return
      that.loadComplete = false //可上拉
      if(type=='one'){
        that.bottomLine = false
        that.isLoading = false
      }
      that.noData = false //无数据图片
      that.$axiosHttp.http({
        url: that.$httpConfig.managerArticleUrl,
        params: {
          forum:that.plateId, //板块id
          name:that.managerDetail.managerName, //管理人姓名
          pageNo:that.pageNo, //页码
          pageSize:10, //分页数量
        },
        method: "POST"
      },res => { //接口成功0000
        if(type=='one'){
          that.reportList = []
          that.reportList = res.data.list || [] //赋值列表
          that.$refs.loadmore1.onTopLoaded()
        }else{
          that.isLoading = false
          that.reportList = that.reportList.concat(res.data.list)
        }
      },res => { // 接口错误4000
        
      },res => { // 接口返回1000
        that.$refs.loadmore1.onTopLoaded()
        if(type=='one'){
          that.noData = true //无数据图片
        }else{
          that.getPlatesList()
          that.loadComplete = true //不可上拉
          that.isLoading = false
          that.bottomLine = true
        }
      })
    },
    // 下拉刷新
    loadTop() {
      this.pageNo = 1
      this.getPlateData('one')
    },
    // 上拉加载
    loadMore() {
      let that = this
      that.pageNo ++
      that.loadComplete = true //不可上拉
      that.isLoading = true //底部加载圈
      if(!that.bottomLine) { //上拉加载未完成
        setTimeout(()=>{
          that.getPlateData('more')
        },500)
      }else{ //已完成，无更多数据
        that.isLoading = false //底部加载圈
        return false
      }
    },
    // 跳转详情
    gotoOutDetail(item){
      this.$urls.routerPush(
        this,
        this.$urls.gotoOutDetail,
        {articleId:item.publishId,titleName:'详情',isShare:1},
        false
      );
    },
    // 滚动监听事件
    handleScroll(){
      let height = document.getElementById('pageTitle').clientHeight;
      if (this.$refs.touchstone.getBoundingClientRect().top <= height ) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
      //判断苹果和安卓
      if( !window.appIsIOS ){
        //安卓手机，可以使用这种办法
        let height = document.getElementById('pageTitle').clientHeight;
        if (this.$refs.touchstone.getBoundingClientRect().top <= height ) {
            this.isFixed = true;
        } else {
            this.isFixed = false;
        }
      }
    },
   
  }
};
</script>

<style lang="scss" spoced>
.manager-box{
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  overflow-y: auto;
  overflow-x: hidden;
 
  .card-box{
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #F3F5F7
  }
  .card-wrap{
    width:6.9rem;
    height: 3.91rem;
    margin: .3rem auto ;
    background: url('../../assets/img/Me_card-bg.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .head-img-wrap{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: .04rem;
      position: absolute;
      left:.32rem;
      top: .48rem;
      background: #FFFFFF;
      text-align: center;
      /* line-height: 3.625rem; */
      font-size: .86rem;
      font-weight:600;
      overflow: hidden;
      .head-img{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .nomorl{
        color:#ededed;
        line-height: 1.4rem;
      }
    }
    /* 右边姓名和简介介绍 */
    .right-name{
      position: absolute;
      top: .68rem;
      left: 2.14rem;
      height: .4rem;
      font-size: .28rem;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height: .4rem;
      background:linear-gradient(161deg, rgba(251,226,189,1) 0%, rgba(226,181,128,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .introduce{
      width: 4.36rem;
      height: .75rem;
      position: absolute;
      top: 1.18rem;
      left: 2.12rem;
      font-size: .24rem;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:.36rem;
      opacity: 0.68;
      overflow: hidden;
    }
    /* 虚线 */
    .dashed-line{
      position: absolute;
      top:2.3rem;
      left: .33rem;
      width: 6.3rem;
      height: 1px;

    }
    /* 下部分名片信息 */
    .card-message{
      width: 100%;
      position: absolute;
      top:2.63rem;
      left:0;
      padding:0 .27rem 0 .33rem;
      display: flex;
      flex-wrap:wrap;
      .message{
        height: .55rem;
        font-size: .24rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:.33rem;
        opacity: 0.7;
        width: 3.4rem;
      }
      .message2,.message4{
        width: 2.86rem;
      }
    }
  }
  /* tab标签 */
  .switch-tab-wrap{
    width: 100%; 
    height: auto;
    position: relative;
    .switch-tab-sticky{
      width: 100%;
      height:  .8rem;
      position: relative;
      .switch-tab{
      position: absolute;
      left:0;
      top:0;
      height: .8rem;
      font-size: .28rem;
      font-weight:600;
      z-index:11;
      background: #FFFFFF;
      overflow-x:auto;
      overflow-y: hidden;
      border-bottom:.01rem solid #F3F5F7;
      .mint-tab-item-label{
        height: .4rem;
        line-height: .4rem;
        padding:0 .29rem;
        white-space:nowrap
      }
      /* 未点击标签 */
      .mint-tab-item{
        padding-top: .18rem;
        color: #9B9B9B;
        font-weight: 400;
      }
      /* 点击标签 */
      .mint-tab-item.is-selected{
        color: #272727;
        padding-top:.18rem;
        background: url('../../assets/img/erji.png') no-repeat center bottom 0.5px;
        background-size: .5rem .06rem;
      }
      .is-selected .mint-tab-item-label{
        font-size: .28rem;
        font-weight: 600
      }
    }
    .fixed-Tab{
      width: 100%;
      position: fixed;
      left:0;
      top:.875rem;
      z-index:12;
    }
  }
    /* 粘性定位class */
    .stickyTab{
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 2;
    }
    /* 标签对应的内容 */
    /* ---左--- */
    .containt-left{
      background: #FFFFFF;
      padding: .38rem .59rem .37rem .6rem;
      color:#676767;
      font-weight:400;
      line-height:.5rem;
      font-size: .28rem;
      word-break:break-all;
      word-wrap:break-word;
      height: auto;
    }
    /* ---右--- */
    .containt-right{
      padding-top:.64rem;
      background: #FFFFFF;
      min-height: 7.86rem;
      /* .mint-loadmore{
        height: 100%;
        .mint-loadmore-content{
          height: 100%;
          .load-scroll{
            height: 100%;
          }
        }
      } */
      .report-list{
        padding:0 .62rem .47rem .29rem;
        position: relative;
        .report-img{
          width: 2.3rem;
          height: 1.61rem;
          border-radius: .08rem;
          overflow: hidden;
          img{
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
        .report-tit{
          position: absolute;
          left:2.9rem;
          top: .01rem;
          height: 1rem;
          width: 4rem;
          color: #272727;
          font-size:.32rem;
          font-weight:600;
          color:rgba(39,39,39,1);
          line-height:.5rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          word-break:break-all;
          word-wrap:break-word
        }
        .report-time{
          height: .37rem;
          color: #9B9B9B;
          font-size:.26rem;
          font-weight:400;
          line-height:.37rem;
          position: absolute;
          left: 2.9rem;
          top: 1.26rem;
        }
      }
    }
  }
}
</style>
