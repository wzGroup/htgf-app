<!--
    下拉刷新上拉加载公共控件
    @Author：史芸瑞
    @Date：2020-5-26
    @desc：下拉刷新上拉加载公共控件，使用slot开放内容。使用Promise进行异步回调。
      使用方法：<list-load-more @loadMore="loadMore" @refresh="refresh">
        loadMore为上拉加载更多的回调，param1：pageNo当前的页码 param2:resolve成功回调 param3：reject失败回调
    @example：memberActivitiesList.vue
 -->

<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        @translate-change="translateChange"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="bottomAllLoaded"
        ref="loadmore"
      >
        <slot></slot>

        <!-- todo 需要处理一下恒天自己的loadmore log -->

        <!-- <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>    


        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>-->
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    settings: {//组件设置参数
      type: Object,
      default: ()=>{
        {}
      },
      // loadType: {
      //   //加载类型，默认支持下拉刷新和上拉加载。 type=onlyLoadMore：只支持上拉加载更多。type=onlyRefresh：只支持上拉刷新
      //   type: String,
      //   default: ""
      // },
      height: {
        //组件的高度。默认是整屏高度减pagetitle高度。需要自定义高度则传入想要的高度即可。
        type: Number,
        default: 0
      }
    }
  },
  data() {
    return {
      //是否允许下拉 true为不允许，false为允许
      bottomAllLoaded: false,
      //页面高度
      wrapperHeight: 0,
      //当前的页数，默认是第一页
      pageNo: 1,
      //上拉加载更多时底部区域的状态
      bottomStatus: "",
      //下拉刷新时底部区域的状态
      topStatus: "",
      //下拉/上拉的最大距离
      translate: 0,
      moveTranslate: 0,
    };
  },

  methods: {
    //上拉加载更多
    loadBottom() {
      new Promise((resolve, reject) => {
        this.pageNo ++
        //触发父控件loadMore函数 param1:该请求的页数  param2:成功的回调  param3:失败的回调
        this.$emit("loadMore", this.pageNo, resolve, reject)
      }).then((status)=>{
        //加载成功 将接口返回的status回传回来。或者手动传1000，代表没有更多数据
        console.log("加载成功");
        if (status == "1000"){
          //暂无更多数据了 不允许下拉
          this.bottomAllLoaded = true
        }
        this.$refs.loadmore.onBottomLoaded();
      }, (error)=>{
        //加载失败
        console.log("加载失败");
        this.$refs.loadmore.onBottomLoaded();
      })
    },
    //组件底部的新状态名
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    //组件顶部的新状态名
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    //下拉刷新
    loadTop() {
      new Promise((resolve, reject) => {
        //触发父控件refresh函数
        this.$emit("refresh", resolve, reject)
      }).then(()=>{
        //刷新成功
        console.log("刷新成功");
        this.$refs.loadmore.onTopLoaded();
        //下拉刷新后就允许上拉加载更多
        this.bottomAllLoaded = false;
        //将当前页数置为1
        this.pageNo = 1;
      }, (error)=>{
        //刷新失败
        console.log("刷新失败");
        this.$refs.loadmore.onTopLoaded();
      })
    }
  },

  mounted() {
    //设置组件高度 默认为页面高度减去pageTitle高度
    if (this.settings && this.settings.height){
      this.wrapperHeight = this.settings.height;
    } else {
      this.wrapperHeight = document.documentElement.clientHeight - 88;
    }
    
  }
};
</script>