<!--
    页面title模板
    @Author：史芸瑞
    @Date：2020-5-26
    @desc：以插槽的形式对外开放，支持自定义局部样式与点击回调。
    自定义设置请在headerSetting中传值，目前支持两个属性
        1.needProcessSelf：如需自定义点击事件处理，设置为想要自定义处理的位置。同时在组件中接收 headerClickCallBack 并指向自己的处理函数。
        2.backType：返回模式。目前支持 返回上一个H5 返回App和返回指定连接
    @example：memberActivitiesList.vue
 -->
<template>
  <div id="pageTitle" class="pageTitle">
    <div :class="[headerSetting.needBorder ? 'pTitle' : 'pTitle noBorder']" ref="pTitle">
      <div class="left" @click="processClick('left')">
        <!-- 以插槽形式对外开放，支持自定义。-->
        <slot name="header_left">
          <span class="iconfont icon_fanhui3x" htmdEvt="back_btn">&#xe656;</span>
        </slot>
      </div>
      <div class="center" @click="processClick('center')">
        <!-- 以插槽形式对外开放，支持自定义。-->
        <slot name="header_center">
          <h2 class="title">{{title}}</h2>
        </slot>
      </div>
      <div class="right" @click="processClick('right')">
        <!-- 以插槽形式对外开放，支持自定义。默认右边不展示 -->
        <slot name="header_right"></slot>
      </div>
    </div>
    <div class="blank"></div>
  </div>
</template>
<script>
import "../../assets/css/common/pagetitle.scss";

export default {
  name: "pageTitle",
  props: {
    title: {
      //标题
      type: String
    },
    headerSetting: {
      //头部的设置信息
      needBorder: true,
      needProcessSelf: {
        //是否需要父组件自己处理点击事件。默认不需要。left：处理左边、right：处理右边、center：处理中间
        type: String,
        default: ""
      },
      backType: {
        //点击返回键的返回模式。""：返回上一个页面（默认）、 "backApp"：返回AppNative、"xxx/xxx/xxx":具体返回的路径
        type: String,
        default: ""
      },
      default: () => {
        return {
          needBorder: true,
          needProcessSelf: "",
          backType: ""
        };
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // desc: 点击事件的处理
    // param1: 点击的区域， left：左边  center：中间  right：右边
    processClick(type) {
      if (this.headerSetting.needProcessSelf == type) {
        //自己处理点击的回调函数，触发父组件中的headerClickCallBack属性
        this.$emit("headerClickCallBack", this.headerSetting.needProcessSelf);
        return false;
      }
      if (type == "left") {
        //左侧点击事件，默认为返回上一层。根据backType来具体处理
        if (typeof document.referrer == "") {
        // if (this.$route.path == '/') {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            //这个是安卓操作系统
            window.jsObj.backNative();
          }
          if (isIOS) {
            //这个是ios操作系统
            window.webkit.messageHandlers.backNative.postMessage("backNative");
          }
        } else {
          // this.$router.go(-1);
          this.$router ? this.$router.back() : window.history.back()
        }
      }
    }
  }
};
</script>
